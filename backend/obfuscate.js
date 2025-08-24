import JavaScriptObfuscator from "javascript-obfuscator";

export function obfuscateJS(code) {
  const obfuscated = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    disableConsoleOutput: true,
    stringArray: true,
    stringArrayEncoding: ["rc4"],
    stringArrayThreshold: 0.75,
    rotateStringArray: true,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  });
  return obfuscated.getObfuscatedCode();
}