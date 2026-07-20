import fs from 'fs/promises';
import path from 'path';

export type ScannerOptions = {
  root: string;
  targets: string[];
  onFind: (dir: string) => void;
  onFinish?: () => void;
};

export async function scanDirectories({ root, targets, onFind, onFinish }: ScannerOptions): Promise<void> {
  async function crawl(currentPath: string) {
    let entries;
    try {
      entries = await fs.readdir(currentPath, { withFileTypes: true });
    } catch (err) {
      // Ignore permission denied or missing directories
      return;
    }

    const subDirs: string[] = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      
      const fullPath = path.join(currentPath, entry.name);
      
      if (targets.includes(entry.name)) {
        onFind(fullPath);
      } else {
        // Skip hidden directories for performance (e.g., .git)
        // Exception: some targets might be hidden, like .venv, but if they are targets, 
        // they are already caught above. So here we can safely ignore remaining hidden dirs.
        if (!entry.name.startsWith('.')) {
          subDirs.push(fullPath);
        }
      }
    }

    // Concurrent recursion
    await Promise.all(subDirs.map(crawl));
  }

  await crawl(root);
  if (onFinish) onFinish();
}
