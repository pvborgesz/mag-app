export const formatRegionsAndDescriptorsPrompt = (prompt: string) => `
You are an expert in NCL (Nested Context Language) regions and descriptors. Based on the following concepts, strictly follow the steps below to generate the correct NCL document.

**Instructions:**
1. **Identify** all regions mentioned in the command.
2. **Determine** the necessary properties for each region (id, width, height, zIndex).
3. **Create** a hierarchical structure to organize the regions with their specified properties.
4. **Define** the descriptors that reference each identified region.

**Example 1:**
Command: "Create a region for a video at 80% width and 60% height, with a zIndex of 2."
\`\`\`xml
<regionBase>
  <region id="videoRegion" width="80%" height="60%" zIndex="2"/>
</regionBase>
<descriptorBase>
  <descriptor id="videoDescriptor" region="videoRegion"/>
</descriptorBase>
\`\`\`

**Example 2:**
Command: "Add a region for subtitles at the bottom of the screen, covering 100% width and 10% height."
\`\`\`xml
<regionBase>
  <region id="subtitleRegion" width="100%" height="10%" zIndex="1"/>
</regionBase>
<descriptorBase>
  <descriptor id="subtitleDescriptor" region="subtitleRegion"/>
</descriptorBase>
\`\`\`

**Your task:**
- Return **only** the NCL document with the corrected definitions of regions and descriptors.
- **Do not** include explanations, comments, or any other type of additional text.

**Command:**
${prompt}
`
export const formatRegionsAndDescriptorsPromptCot = (prompt: string) => `
You are an expert in NCL (Nested Context Language) regions and descriptors. Follow the steps below to carefully generate the correct NCL document.

**Instructions:**
1. **Identify** all regions mentioned in the command, such as their size and positioning on the screen.
   - Think about how each region might be arranged (e.g., video, subtitles).
2. **Determine** the necessary properties for each region (id, width, height, zIndex).
   - Reflect on how width, height, and zIndex would interact to achieve the described layout.
3. **Create** a hierarchical structure to organize the regions with their specified properties.
   - Consider whether any regions should be nested within others.
4. **Define** the descriptors that reference each identified region.

**Chain of Thought Example:**
Command: "Create a video region with 80% width and 60% height, and a subtitle region at the bottom with 100% width and 10% height."
1. **Identify**: There are two regions—one for video and one for subtitles.
2. **Determine**: The video region should have 80% width, 60% height, and a zIndex higher than the subtitles (which go at the bottom).
3. **Organize**: Both regions will be in the region base, with no nesting needed.
4. **Define**: Each region will have a descriptor that points to it.

Result:
\`\`\`xml
<regionBase>
  <region id="videoRegion" width="80%" height="60%" zIndex="2"/>
  <region id="subtitleRegion" width="100%" height="10%" zIndex="1"/>
</regionBase>
<descriptorBase>
  <descriptor id="videoDescriptor" region="videoRegion"/>
  <descriptor id="subtitleDescriptor" region="subtitleRegion"/>
</descriptorBase>
\`\`\`

**Command:**
${prompt}
`
export const formatRegionsAndDescriptorsPromptTot = (prompt: string) => `
You are an expert in NCL (Nested Context Language) regions and descriptors.
Explore different ways to structure the regions and descriptors before finalizing the correct NCL document.

**Instructions:**
1. **Identify** all possible region structures based on the command.
2. **Determine** the best way to organize the regions hierarchically (consider different layouts or nesting options).
3. **Explore** different ways to define the descriptors that reference the regions.
4. **Finalize** the best solution by selecting the most appropriate region and descriptor structure.

**Tree of Thought Example:**
Command: "Create regions for video, subtitles, and an overlay, each with different sizes."
1. **Option 1**: Create three separate regions with no nesting.
2. **Option 2**: Create a parent region for the video and overlay the subtitles as a child region.
3. **Option 3**: Nest all three regions hierarchically for easier manipulation of their layout.
4. **Choose the best structure** based on the layout requirements and the need for flexibility in the NCL document.

Finalize:
\`\`\`xml
<regionBase>
  <region id="videoRegion" width="80%" height="60%" zIndex="2"/>
  <region id="subtitleRegion" width="100%" height="10%" zIndex="1"/>
  <region id="overlayRegion" width="50%" height="50%" zIndex="3"/>
</regionBase>
<descriptorBase>
  <descriptor id="videoDescriptor" region="videoRegion"/>
  <descriptor id="subtitleDescriptor" region="subtitleRegion"/>
  <descriptor id="overlayDescriptor" region="overlayRegion"/>
</descriptorBase>
\`\`\`

**Command:**
${prompt}
`
