const fs = require("fs");
const targetPath = "./src/environments/environment.prod.ts";
const envConfigFile = `
export const environment = {
  production: true,
  supabaseURL: '${process.env.supabaseURL}',
  supabaseKey: '${process.env.supabaseKey}'
};
`;
fs.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);
