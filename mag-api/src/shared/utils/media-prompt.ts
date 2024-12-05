export const formatMediaPrompt = (prompt: string) => `
You are an expert in NCL (Nested Context Language) media definition.
Based on the following command, strictly follow the steps to define the media elements in NCL.

**Instructions:**
1. **Identify** all media elements mentioned in the command.
2. **Determine** the necessary attributes for each media element and the inclusion of <area> elements where applicable.
3. **Generate** the NCL document containing only the required <media> and <area> elements.

**Example 1:**
Command: "Insert a video and define an area that starts at 10 seconds."
\`\`\`
<media id="video1" src="path/to/video">
  <area id="area1" begin="10s"/>
</media>
\`\`\`

**Example 2:**
Command: "Add an video element."
\`\`\`
<media id="video1" src="path/to/audio"/>
\`\`\`

**Your task:**
- Return **only** the NCL document containing the <media> elements and, if applicable, <area> elements.
- **Do not** include explanations, comments, or any additional text.

**Command:**
${prompt}
`
