export const correctionPrompt = (validateCode: string, result: string) => `
You are an expert in NCL (Nested Context Language) document validation and correction. Your task is to adopt an analytical approach to review the provided NCL document and identify any errors or inconsistencies present.

**Steps for your analysis:**
1. **Identify** the errors in the NCL document using the provided information: ${validateCode}.
2. **Correct** each identified error, ensuring that the resulting document adheres to the NCL standard.
3. **Organize** the corrected document in a clear and cohesive manner.

**Goal:**
Send only the corrected NCL document, without any additional text or comments.

**Current document:**
${result}
`
