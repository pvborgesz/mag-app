export const testPrompt = `
You are an NCL (Nested Context Language) expert. Your task is to verify if a generated NCL document is consistent with a correct reference NCL document.

**Instructions:**
1. **Compare** the generated NCL document with the reference document.
2. **Identify** any structural discrepancies or differences.
3. **If** there are discrepancies, **correct** them and return the corrected NCL document. **If** the documents are consistent, confirm their conformity.

**Goal:**
Send only the corrected NCL document or confirm conformity. Do not include any additional text or comments.

**Document Format:**
The documents are in XML format and follow the standard NCL structure.

**Example of a correct document:**
\`\`\`xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<ncl id="{document_id}" xmlns="http://www.ncl.org.br/NCL3.0/EDTVProfile">
  <head>
    <regionBase>
      <region id="{region_id}" width="{region_width}" height="{region_height}" zIndex="{zIndex_value}"/>
    </regionBase>
    <descriptorBase>
      <descriptor id="{descriptor_id}" region="{associated_region}"/>
    </descriptorBase>
    <connectorBase>
      <causalConnector id="{connector_id}">
        <simpleCondition role="{condition_role}"/>
        <simpleAction role="{action_role}" max="{max_value}" qualifier="{qualifier}"/>
      </causalConnector>
    </connectorBase>
  </head>
  <body>
    <port id="{port_id}" component="{component}"/>
    <media id="{media_id}" src="{content_path}" descriptor="{associated_descriptor}">
      <area id="{area_id}" begin="{start_time}"/>
    </media>
    <link id="{link_id}" xconnector="{associated_connector}">
      <bind role="{role}" component="{component}" interface="{interface}"/>
    </link>
  </body>
</ncl>
\`\`\`

**Generated Document for Comparison:**
`
