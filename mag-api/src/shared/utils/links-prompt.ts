import { ConnectorsEnum } from './connectors-base-string'

export const formatLinksPrompt = (prompt: string, connectorsEnum: typeof ConnectorsEnum) => `
You are an expert in NCL (Nested Context Language) link and connector formatting.
Your task is to analyze the following command and return the most appropriate connector(s) from the provided enum.

**Instructions:**
1. **Review** the command carefully.
2. **Select** the appropriate connector(s) from the enum list below that best match the command.
3. **Return** the NCL code string(s) corresponding to the selected connector(s) from the list provided, without any additional formatting like backticks (\`\`\`).

**Available Connectors Enum:**
${Object.entries(connectorsEnum)
  .map(([key, value]) => `${key}: ${value}`)
  .join(', ')}

**Response Format:**
- Return the NCL code string(s) that best fit the command from the available connectors, using their original enum names.
- Return only the code string, without including any extra symbols like backticks (\`\`\`) or "xml".
- Do **not** include any extra explanations, comments, or additional text.

**Command:**
${prompt}
`
