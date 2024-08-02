const getEnvVariable = function (name: string): string {
  const value = process.env[name];
  if (typeof value !== "string")
    throw new Error(`Missing or invalid environment variable: ${name}`);
  return value;
};

export { getEnvVariable };
