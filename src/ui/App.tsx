import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { scanDirectories } from '../core/scanner.js';
import { calculateDirectorySize } from '../core/size-calculator.js';
import { deleteDirectory } from '../core/deleter.js';
import chalk from 'chalk';

type Directory = {
  path: string;
  size: number | null;
  status: 'calculating' | 'ready' | 'deleting' | 'deleted' | 'error';
};

export const App = ({ rootPath }: { rootPath: string }) => {
  const { exit } = useApp();
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [spaceSaved, setSpaceSaved] = useState(0);

  useEffect(() => {
    const targets = ['node_modules', 'target', 'venv', 'vendor'];
    
    scanDirectories({
      root: rootPath,
      targets,
      onFind: (dirPath) => {
        setDirectories((prev) => {
          // Check if it already exists
          if (prev.find(d => d.path === dirPath)) return prev;
          return [...prev, { path: dirPath, size: null, status: 'calculating' }];
        });

        // Calculate size async
        calculateDirectorySize(dirPath).then(size => {
          setDirectories((prev) => 
            prev.map(d => d.path === dirPath ? { ...d, size, status: 'ready' } : d)
          );
        }).catch(() => {
          setDirectories((prev) => 
            prev.map(d => d.path === dirPath ? { ...d, status: 'error' } : d)
          );
        });
      },
      onFinish: () => setIsScanning(false)
    });
  }, [rootPath]);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(directories.length - 1, prev + 1));
    }
    
    // Press space to delete
    if (input === ' ') {
      const selectedDir = directories[selectedIndex];
      if (selectedDir && selectedDir.status === 'ready') {
        // Mark as deleting
        setDirectories((prev) => 
          prev.map((d, i) => i === selectedIndex ? { ...d, status: 'deleting' } : d)
        );

        deleteDirectory(selectedDir.path).then(() => {
          setSpaceSaved((prev) => prev + (selectedDir.size || 0));
          setDirectories((prev) => 
            prev.map((d, i) => i === selectedIndex ? { ...d, status: 'deleted' } : d)
          );
        }).catch(() => {
          setDirectories((prev) => 
            prev.map((d, i) => i === selectedIndex ? { ...d, status: 'error' } : d)
          );
        });
      }
    }

    if (input === 'q' || input === 'Q' || key.escape) {
      exit();
    }
  });

  const formatSize = (bytes: number | null) => {
    if (bytes === null) return 'Calculating...';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          🧹 dev-sweeper 
        </Text>
        <Text color="gray"> (Scanning: {isScanning ? 'Yes...' : 'Done'})</Text>
      </Box>

      <Box flexDirection="column" minHeight={10}>
        {directories.length === 0 && !isScanning ? (
          <Text color="green">No target directories found. You're all clean!</Text>
        ) : (
          directories.map((dir, index) => {
            const isSelected = index === selectedIndex;
            const pointer = isSelected ? chalk.magenta('❯') : ' ';
            let color = 'white';
            if (dir.status === 'deleted') color = 'gray';
            else if (dir.status === 'deleting') color = 'yellow';
            else if (dir.status === 'error') color = 'red';
            else if (isSelected) color = 'cyan';

            let statusText = '';
            if (dir.status === 'deleted') statusText = chalk.red(' (DELETED)');
            if (dir.status === 'deleting') statusText = chalk.yellow(' (Deleting...)');
            if (dir.status === 'error') statusText = chalk.red(' (Error)');

            return (
              <Box key={dir.path}>
                <Text>
                  {pointer} <Text color={color}>{dir.path}</Text>
                </Text>
                <Box marginLeft={2}>
                  <Text color={dir.status === 'deleted' ? 'gray' : 'green'}>
                    [{formatSize(dir.size)}]{statusText}
                  </Text>
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text>
          <Text bold color="green">Space Saved: </Text>
          <Text bold>{formatSize(spaceSaved)}</Text>
        </Text>
        <Text color="gray">
          [↑/↓] Navigate  |  [Space] Delete  |  [Q/Esc] Quit
        </Text>
      </Box>
    </Box>
  );
};
