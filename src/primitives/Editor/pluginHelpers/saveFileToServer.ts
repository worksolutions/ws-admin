export const saveFileToServer = async (file: File, editor: any): Promise<{ default: string } | null> => {
  try {
    const loader = await editor.plugins.get("FileRepository").createLoader(file);
    await loader.read();
    return await loader.upload();
  } catch (e) {
    return null;
  }
};
