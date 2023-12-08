const encoder = new TextEncoder();
const decoder = new TextDecoder();

const getKey = async () => {
  const rawKey = "a7Bc8D0eF1Gh2Ij3Kl4Mn5Op6Qr7St8U";
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(rawKey),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encrypt = async (text) => {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );
  return { iv, data: encrypted };
};

export const decrypt = async (encrypted, iv) => {
  const key = await getKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );
  return decoder.decode(decrypted);
};
