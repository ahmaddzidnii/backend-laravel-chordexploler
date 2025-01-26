const encodeBase64 = (url: string) => {
  return Buffer.from(url).toString("base64");
};

const decodeBase64 = (state: string) => {
  try {
    return Buffer.from(state, "base64").toString();
  } catch (error) {
    console.error("Invalid base64 state:", error);
    return null;
  }
};

export { encodeBase64, decodeBase64 };
