export const formatStructurePrompt = (
  mediaResult: string,
  descriptorsResult: string,
  linksResult: string
) => `
You are an expert in NCL (Nested Context Language) document generation. Your task is to generate the full structure of the NCL document in XML format, integrating the provided media, descriptors, and links results. Use a Tree of Thoughts approach to ensure all components are properly organized and structured.

**Instructions:**
1. **Infer and include** the necessary ports based on the media and links provided, ensuring that any component requiring external access is properly linked through a port.
2. **Integrate** the main components of the NCL document, including the header, body, and all required sections.
3. **Relate** each part of the document (descriptors, media, links) in such a way that all interactions and hierarchies are clear and correctly established.
4. **Generate** the complete NCL document by combining the results from ${mediaResult}, ${descriptorsResult}, and ${linksResult} as required by the command.

**Response Format:**
- Return **only** the complete NCL document.
- **Do not** include explanations, comments, or any other additional text.

**Expected Structure:**

\`\`\`xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<ncl id="{document_id}" xmlns="http://www.ncl.org.br/NCL3.0/EDTVProfile">
  <head>
    ${descriptorsResult}
    <connectorBase>
      <!-- Example of a connector (there may be more) -->
      <causalConnector id="{connector_id}">
        <simpleCondition role="{condition_role}"/>
        <simpleAction role="{action_role}" max="{max_value}" qualifier="{qualifier}"/>
      </causalConnector>
    </connectorBase>
  </head>
  <body>
    <!-- Inferred Ports for interactions -->
    ${mediaResult
      .split('<media')
      .map((mediaTag, index) => {
        if (mediaTag.includes('id="')) {
          const componentId = mediaTag.match(/id="([^"]*)"/)?.[1]
          return `<port id="port_${index}" component="${componentId}"/>`
        }
        return ''
      })
      .join('\n')}

    ${mediaResult}
    ${linksResult}
  </body>
</ncl>
\`\`\`

**Important:**
- Ensure that the XML structure is complete and adheres to the NCL standard, automatically inferring ports when necessary based on media components.

**Command:**
Use the provided components to construct the full document, inferring ports when applicable.
`
