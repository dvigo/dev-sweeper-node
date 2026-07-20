import fs from 'fs/promises';
import path from 'path';

export async function calculateDirectorySize(dirPath: string): Promise<number> {
  let totalSize = 0;

  async function calculate(currentPath: string) {
    let entries;
    try {
      entries = await fs.readdir(currentPath, { withFileTypes: true });
    } catch {
      return;
    }

    const tasks = entries.map(async (entry: any) => {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await calculate(fullPath);
      } else if (entry.isFile()) {
        try {
          const stats = await fs.stat(fullPath);
          totalSize += stats.size;
        } catch {
          // Ignore stats error
        }
      }
    });

    // Run concurrently. In most modern systems, the EMFILE limit is high enough,
    // but if it crashes we can implement a concurrency limit.
    await Promise.all(tasks);
  }

  await calculate(dirPath);
  return totalSize;
}
