import fs from 'fs/promises';

export async function deleteDirectory(dirPath: string): Promise<void> {
  await fs.rm(dirPath, { recursive: true, force: true });
}
