async function generatePBKDF2(password) {
  const encoder = new TextEncoder();
  const salt = encoder.encode('salt_for_simba'); // 固定盐，与代码匹配
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), {name: 'PBKDF2'}, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256'}, key, 256);
  const hash = btoa(String.fromCharCode(...new Uint8Array(bits)));
  return `pbkdf2-sha256-100000-32-salt_for_simba-${hash}`;
}
generatePBKDF2('123456').then(console.log);
