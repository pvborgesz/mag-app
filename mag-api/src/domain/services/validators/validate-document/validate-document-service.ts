import type { IValidateDocumentService } from '@/domain/contracts/validators/services/validate-document-service'
import {
  NCLPort,
  NCLMedia,
  NCLEffect,
  NCLBind,
  NCLContext,
  NCLSwitch,
  NCLMapping,
  NCLBody,
  NCLHead,
  NCLRegionBase,
  NCLDescriptorBase,
  NCLConnectorBase,
  NCLImportedDocumentBase,
  NCLLink,
  NCLDefaultComponent,
  NCLConnector,
  NCLElement
} from '@/domain/contracts/validators/value-objects'
import * as fs from 'fs'

type Input = IValidateDocumentService.Params
type Output = IValidateDocumentService.Result

export class ValidateDocumentService implements IValidateDocumentService {
  async validate({ document: doc }: Input): Promise<Output> {
    let diagnostics: string[] = []

    if (doc) {
      const domParser = require('xmldom').DOMParser
      const domObj = new domParser({
        locator: {},
        errorHandler: {
          warning: (w: string) => {
            console.warn(w)
          },
          error: (msg: string, locator: any) => {
            if (locator) {
              diagnostics.push(`Error: ${msg} at line ${locator.lineNumber}, column ${locator.columnNumber}`)
            } else {
              diagnostics.push(`Error: ${msg}`)
            }
          },
          fatalError: (msg: string, locator: any) => {
            if (locator) {
              diagnostics.push(
                `Fatal Error: ${msg} at line ${locator.lineNumber}, column ${locator.columnNumber}`
              )
            } else {
              diagnostics.push(`Fatal Error: ${msg}`)
            }
          }
        }
      }).parseFromString(doc, 'text/xml')

      const docHead = domObj.getElementsByTagName('head')[0]
      const docBody = domObj.getElementsByTagName('body')[0]

      if (!docHead) {
        diagnostics.push(`Error! Document without <head> tag!`)
        return diagnostics
      }

      if (!docBody) {
        diagnostics.push(`Error! Document without <body> tag!`)
        return diagnostics
      }

      const docPorts = domObj.getElementsByTagName('port')
      const ports: NCLPort[] = []
      for (let i = 0; i < docPorts.length; i++) {
        ports.push(new NCLPort(docPorts[i], docPorts[i].lineNumber, docPorts[i].columnNumber))
      }

      const docMedias = domObj.getElementsByTagName('media')
      const medias: NCLMedia[] = []
      for (let i = 0; i < docMedias.length; i++) {
        medias.push(new NCLMedia(docMedias[i], docMedias[i].lineNumber, docMedias[i].columnNumber))
      }

      const docEffects = domObj.getElementsByTagName('effect')
      const effects: NCLEffect[] = []
      for (let i = 0; i < docEffects.length; i++) {
        effects.push(new NCLEffect(docEffects[i], docEffects[i].lineNumber, docEffects[i].columnNumber))
      }

      const docBinds = domObj.getElementsByTagName('bind')
      const binds: NCLBind[] = []
      for (let i = 0; i < docBinds.length; i++) {
        binds.push(new NCLBind(docBinds[i], docBinds[i].lineNumber, docBinds[i].columnNumber))
      }

      const docContexts = domObj.getElementsByTagName('context')
      const contexts: NCLContext[] = []
      for (let i = 0; i < docContexts.length; i++) {
        contexts.push(new NCLContext(docContexts[i], docContexts[i].lineNumber, docContexts[i].columnNumber))
      }

      const docSwitches = domObj.getElementsByTagName('switch')
      const switches: NCLSwitch[] = []
      for (let i = 0; i < docSwitches.length; i++) {
        switches.push(new NCLSwitch(docSwitches[i], docSwitches[i].lineNumber, docSwitches[i].columnNumber))
      }

      const docMappings = domObj.getElementsByTagName('mapping')
      const mappings: NCLMapping[] = []
      for (let i = 0; i < docMappings.length; i++) {
        mappings.push(new NCLMapping(docMappings[i], docMappings[i].lineNumber, docMappings[i].columnNumber))
      }

      const bodyObj = new NCLBody(docBody, docBody.lineNumber, docBody.columnNumber)
      const headObj = new NCLHead(docHead, docHead.lineNumber, docHead.columnNumber)

      const bodyIDs = bodyObj.getChildrenIDRecursively(bodyObj.inner['childNodes'])
      const headIDs = headObj.getChildrenIDRecursively(headObj.inner['childNodes'])
      const importAliases = headObj.getBasesAlias()
      const regionBases: NCLRegionBase[] = headObj.regionBases
      const descriptorBases: NCLDescriptorBase[] = headObj.descriptorBases
      const connectorBases: NCLConnectorBase[] = headObj.connectorBases
      const connectorBaseImports = []

      for (let i = 0; i < connectorBases.length; i++) {
        connectorBaseImports.push(...connectorBases[i].baseImports)
      }
      let importedConnectors: { importAlias: string; imports: Array<any> }[] = [] // {'importAlias': '', 'imports': new Array<NCLElement>()};

      const descriptorBaseImports = []
      for (let i = 0; i < descriptorBases.length; i++) {
        descriptorBaseImports.push(...descriptorBases[i].baseImports)
      }
      let importedDescriptors: { importAlias: string; imports: Array<any> }[] = [] // {'importAlias': '', 'imports': new Array<NCLElement>()};

      const regionBaseImports = []
      for (let i = 0; i < regionBases.length; i++) {
        regionBaseImports.push(...regionBases[i].baseImports)
      }
      let importedRegions: { importAlias: string; imports: Array<any> }[] = [] // {'importAlias': '', 'imports': new Array<NCLElement>()};

      // console.log(regionBaseImports);

      for (let i = 0; i < connectorBaseImports.length; i++) {
        const baseImport = connectorBaseImports[i]
        let imports = []
        try {
          imports = importBase(
            'connectorBase',
            doc,
            baseImport.documentURI as string,
            baseImport.baseId ? baseImport.baseId : '',
            domParser
          )
        } catch (e) {
          diagnostics.push(`Error! Imported document not found! <importBase>`)
        }
        importedConnectors.push({
          importAlias: baseImport.alias as string,
          imports: new Array(...imports)
        })
      }

      for (let i = 0; i < descriptorBaseImports.length; i++) {
        const baseImport = descriptorBaseImports[i]
        let imports = []
        try {
          imports = importBase(
            'descriptorBase',
            doc,
            baseImport.documentURI as string,
            baseImport.baseId ? baseImport.baseId : '',
            domParser
          )
        } catch (e) {
          diagnostics.push(`Error! Imported document not found! <importBase>`)
        }
        for (let i = 0; i < imports.length; i++) {
          importedDescriptors.push({
            importAlias: baseImport.alias as string,
            imports: new Array(...imports[i]['descriptorObjs'])
          })

          importedRegions.push({
            importAlias: baseImport.alias as string,
            imports: new Array(...imports[i]['regionObjs'])
          })
        }
      }

      for (let i = 0; i < regionBaseImports.length; i++) {
        const baseImport = regionBaseImports[i]
        let imports = []
        try {
          imports = importBase(
            'regionBase',
            doc,
            baseImport.documentURI as string,
            baseImport.baseId ? baseImport.baseId : '',
            domParser
          )
        } catch (e) {
          diagnostics.push(`Error! Imported document not found! <importBase>`)
        }
        // console.log(imports);
        for (let i = 0; i < imports.length; i++) {
          importedRegions.push({
            importAlias: baseImport.alias as string,
            imports: new Array(...imports[i]['regionObjs'])
          })
        }
        // Criar lista separada para bases importadas individualmente
      }
      // console.log("Regioes de <importBase> -->", importedRegions);

      const importedDocumentBase: NCLImportedDocumentBase | null = headObj.importedDocumentBase

      const importsArray: Array<{
        alias: string
        importedRegionBases: any[]
        importedConnectorBases: any[]
        importedDescriptorBases: any[]
        importedMedias: NCLMedia[]
        importedContexts: NCLContext[]
        importedSwitches: NCLSwitch[]
        importedEffects: NCLEffect[]
        headIDs: string[]
        bodyIDs: string[]
      }> = []

      if (importedDocumentBase) {
        for (let i = 0; i < importedDocumentBase.nclImports.length; i++) {
          const nclImport = importedDocumentBase.nclImports[i]
          // console.log(nclImport.documentURI);

          if (nclImport.documentURI && nclImport.alias) {
            let obj = {
              alias: '',
              importedRegionBases: new Array(),
              importedConnectorBases: new Array(),
              importedDescriptorBases: new Array(),
              importedMedias: new Array<NCLMedia>(),
              importedContexts: new Array<NCLContext>(),
              importedSwitches: new Array<NCLSwitch>(),
              importedEffects: new Array<NCLEffect>(),
              headIDs: new Array<string>(),
              bodyIDs: new Array<string>()
            }

            try {
              obj = importDocuments(doc, nclImport.documentURI, nclImport.alias, domParser)
            } catch (e) {
              diagnostics.push(`Error! Imported document not found! <importNCL>`)
            }
            importsArray.push(obj)
          }
        }
      }

      const docLinks = domObj.getElementsByTagName('link')
      const links: NCLLink[] = []
      for (let i = 0; i < docLinks.length; i++) {
        links.push(new NCLLink(docLinks[i], docLinks[i].lineNumber, docLinks[i].columnNumber))
      }

      const docDefaultComponents = domObj.getElementsByTagName('defaultComponent')
      const defaultComponents: NCLDefaultComponent[] = []
      for (let i = 0; i < docDefaultComponents.length; i++) {
        defaultComponents.push(
          new NCLDefaultComponent(
            docDefaultComponents[i],
            docDefaultComponents[i].lineNumber,
            docDefaultComponents[i].columnNumber
          )
        )
      }

      // --------------------------------------------------------------------------------------------------------------------
      // ---------------------------------------------------- VALIDAÇÕES ----------------------------------------------------
      // --------------------------------------------------------------------------------------------------------------------
      if (bodyObj.inner['isEmpty']) {
        // The document body cannot be empty
        diagnostics.push(`Error! Document body cannot be empty! <${bodyObj.tagName}>`)
      }

      if (headObj.inner['isEmpty']) {
        // The document head cannot be empty
        diagnostics.push(`Error! Document header cannot be empty! <${headObj.tagName}>`)
      }

      connectorBaseImports.forEach(connectorBaseImport => {
        const regionId = connectorBaseImport.region ? connectorBaseImport.region : null
        if (regionId) {
          if (!idDoesExist(headIDs, regionId)) {
            diagnostics.push(`Error! Referenced Region ID doesn't exist! <importBase>`)
          } else {
            let connectorDoesExist = false
            regionBases.forEach(rb => {
              if (rb.findRegion(regionId)) {
                // Referenced Region ID isn't from a region
                connectorDoesExist = true
              }
            })

            if (!connectorDoesExist) {
              diagnostics.push(`Error! Referenced Region ID isn't from a region! <importBase>`)
            }
          }
        }

        if (connectorBaseImport.baseId) {
          let flag = true

          importedConnectors.forEach(baseImportObj => {
            // console.log(baseImportObj['imports']);
            baseImportObj['imports'].forEach(importedObj => {
              // console.log(importedObj);

              if (importedObj['importedBaseId'] === connectorBaseImport.baseId) {
                flag = false
              }
            })
          })

          if (flag) {
            diagnostics.push(
              `Error! Referenced Connector Base ID doesn't exist in imported Document! <importBase>`
            )
          }
        }
      })

      descriptorBaseImports.forEach(descriptorBaseImport => {
        const regionId = descriptorBaseImport.region ? descriptorBaseImport.region : null
        if (regionId) {
          if (!idDoesExist(headIDs, regionId)) {
            diagnostics.push(`Error! Referenced Region ID doesn't exist! <importBase>`)
          } else {
            let regionDoesExist = false
            regionBases.forEach(rb => {
              if (rb.findRegion(regionId)) {
                // Referenced Region ID isn't from a region
                regionDoesExist = true
              }
            })

            if (!regionDoesExist) {
              diagnostics.push(`Error! Referenced Region ID isn't from a region! <importBase>`)
            }
          }
        }
        if (descriptorBaseImport.baseId) {
          let flag = true
          importedDescriptors.forEach(baseImportObj => {
            baseImportObj['imports'].forEach(importedObj => {
              if (importedObj['importedBaseId'] === descriptorBaseImport.baseId) {
                flag = false
              }
            })
          })
          if (flag) {
            diagnostics.push(
              `Error! Referenced Descriptor Base ID doesn't exist in imported Document! <importBase>`
            )
          }
        }
      })

      regionBaseImports.forEach(regionBaseImport => {
        const regionId = regionBaseImport.region ? regionBaseImport.region : null
        if (regionId) {
          if (!idDoesExist(headIDs, regionId)) {
            diagnostics.push(`Error! Referenced Region ID doesn't exist! <importBase>`)
          } else {
            let regionDoesExist = false
            regionBases.forEach(rb => {
              if (rb.findRegion(regionId)) {
                // Referenced Region ID isn't from a region
                regionDoesExist = true
              }
            })

            if (!regionDoesExist) {
              diagnostics.push(`Error! Referenced Region ID isn't from a region! <importBase>`)
            }
          }
        }

        if (regionBaseImport.baseId) {
          let flag = true

          importedRegions.forEach(baseImportObj => {
            baseImportObj['imports'].forEach(importedObj => {
              if (importedObj['importedBaseId'] === regionBaseImport.baseId) {
                flag = false
              }
            })
          })

          if (flag) {
            diagnostics.push(
              `Error! Referenced Region Base ID doesn't exist in imported Document! <importBase>`
            )
          }
        }
      })

      connectorBases.forEach(connectorBase => {
        for (let i = 0; i < connectorBase.connectors.length; i++) {
          const connector = connectorBase.connectors[i]
          for (let j = 0; j < connector.actions['simpleActions'].length; j++) {
            const currentAction = connector.actions['simpleActions'][j]
            let flag = false

            if (currentAction['min'] > currentAction['max']) {
              flag = true
            } /* else if (connector.min && connector.max && connector.min > connector.max) {
              flag = true;
            }*/

            if (flag) {
              diagnostics.push(`Error! Role's minimum usage limit exceeds maximum limit! <connector>`)
            }
          }

          for (let j = 0; j < connector.conditions['simpleConditions'].length; j++) {
            const currentCondition = connector.conditions['simpleConditions'][j]
            let flag = false

            if (currentCondition['min'] > currentCondition['max']) {
              flag = true
            } /* else if (connector.min && connector.max && connector.min > connector.max) {
              flag = true;
            }*/

            if (flag) {
              diagnostics.push(`Error! Role's minimum usage limit exceeds maximum limit! <connector>`)
            }
          }
        }
      })

      descriptorBases.forEach(descriptorBase => {
        for (let i = 0; i < descriptorBase.descriptors.length; i++) {
          const descriptor = descriptorBase.descriptors[i]
          if (descriptor.regionId && !(descriptor.regionId.indexOf('#') > -1)) {
            if (!idDoesExist(headIDs, descriptor.regionId)) {
              diagnostics.push(`Error! Referenced Region ID doesn't exist! <descriptor>`)
            } else {
              let flag = true
              regionBases.forEach(regionBase => {
                if (descriptor.regionId && regionBase) {
                  const region = regionBase.findRegion(descriptor.regionId)
                  flag &&= region ? false : true
                }
              })

              if (flag) {
                // Referenced Region ID isn't from a region
                diagnostics.push(`Error! Referenced Region ID isn't from a region! <descriptor>`)
              }
            }
          } else if (descriptor.regionId && descriptor.regionId.indexOf('#') > -1) {
            let applyDiagnostic = true
            const splitId: string[] = descriptor.regionId.split('#')

            if (!idDoesExist(importAliases, splitId[0])) {
              diagnostics.push(`Error! Import alias doesn't exist! <descriptor>`)
            } else {
              for (let i = 0; i < importsArray.length; i++) {
                for (let j = 0; j < importsArray[i]['importedRegionBases'].length; j++) {
                  const result = !searchImportedBase(
                    importsArray[i]['alias'],
                    importsArray[i]['importedRegionBases'][j].regions,
                    splitId[0],
                    splitId[1]
                  )
                  applyDiagnostic = applyDiagnostic && result
                }
              }

              importedRegions.forEach(importedRegion => {
                // console.log(importedRegion['importAlias']);
                // console.log(importedRegion['imports']);
                for (let i = 0; i < importedRegion['imports'].length; i++) {
                  if (
                    importedRegion['imports'][i]['regions'] &&
                    importedRegion['imports'][i]['regions'].length > 0
                  ) {
                    applyDiagnostic &&= !searchImportedBase(
                      importedRegion['importAlias'],
                      importedRegion['imports'][i]['regions'],
                      splitId[0],
                      splitId[1]
                    )
                  }
                  //console.log(applyDiagnostic);
                  // console.log(importedRegion['imports'][i]['regions']);
                }
              })

              importedDescriptors.forEach(importedDescriptor => {
                // console.log(importedDescriptor['importAlias']);
                // console.log(importedRegion['imports']);
                for (let i = 0; i < importedDescriptor['imports'].length; i++) {
                  if (
                    importedDescriptor['imports'][i]['regions'] &&
                    importedDescriptor['imports'][i]['regions'].length > 0
                  ) {
                    applyDiagnostic &&= !searchImportedBase(
                      importedDescriptor['importAlias'],
                      importedDescriptor['imports'][i]['regions'],
                      splitId[0],
                      splitId[1]
                    )
                  }
                  //console.log(applyDiagnostic);
                  //console.log(importedDescriptor['imports'][i]['regions']);
                }
              })

              if (applyDiagnostic) {
                diagnostics.push(`Error! Referenced Region ID isn't from imported base! <descriptor>`)
              }
            }
          }
        }
      })

      for (let i = 0; i < medias.length; i++) {
        const media = medias[i]
        if (media.descriptorId && !(media.descriptorId.indexOf('#') > -1)) {
          if (descriptorBases.length === 0) {
            // Caso não exista <descriptorBase>
            diagnostics.push(`Error! Referenced Descriptor ID doesn't exist! <media>`)
          } else {
            descriptorBases.forEach(descriptorBase => {
              if (media.descriptorId && descriptorBase) {
                if (!idDoesExist(headIDs, media.descriptorId)) {
                  diagnostics.push(`Error! Referenced Descriptor ID doesn't exist! <media>`)
                } else {
                  const descriptor = descriptorBase.findDescriptor(media.descriptorId)
                  // console.log(media.descriptorId.indexOf("#") > -1);
                  if (!descriptor) {
                    // Referenced Descriptor ID isn't from a descriptor
                    diagnostics.push(`Error! Referenced Descriptor ID isn't from a descriptor! <media>`)
                  }
                }
              }
            })
          }
        } else if (media.descriptorId && media.descriptorId.indexOf('#') > -1) {
          let applyDiagnostic = true
          const splitId: string[] = media.descriptorId.split('#')

          if (!idDoesExist(importAliases, splitId[0])) {
            diagnostics.push(`Error! Import alias doesn't exist! <media>`)
          } else {
            for (let i = 0; i < importsArray.length; i++) {
              for (let j = 0; j < importsArray[i]['importedDescriptorBases'].length; j++) {
                const result = !searchImportedBase(
                  importsArray[i]['alias'],
                  importsArray[i]['importedDescriptorBases'][j].descriptors,
                  splitId[0],
                  splitId[1]
                )
                // console.log("result ==", result);
                applyDiagnostic = applyDiagnostic && result
              }
            }
            importedDescriptors.forEach(importedDescriptor => {
              for (let i = 0; i < importedDescriptor['imports'].length; i++) {
                if (
                  importedDescriptor['imports'][i]['descriptors'] &&
                  importedDescriptor['imports'][i]['descriptors'].length > 0
                ) {
                  applyDiagnostic &&= !searchImportedBase(
                    importedDescriptor['importAlias'],
                    importedDescriptor['imports'][i]['descriptors'],
                    splitId[0],
                    splitId[1]
                  )
                }
              }
            })
            if (applyDiagnostic) {
              diagnostics.push(`Error! Referenced Descriptor ID doesn't exist in imported base! <media>`)
            }
          }
        }

        let redundantChild = false

        if (media.refer) {
          if (!(media.refer.indexOf('#') > -1)) {
            if (!idDoesExist(bodyIDs, media.refer)) {
              diagnostics.push(`Error! Reused Media ID doesn't exist! <media>`)
            } else {
              media.availableRefers.forEach(referObj => {
                const refer: NCLMedia = new NCLMedia(
                  referObj['refer'].element,
                  referObj['refer'].lineNumber,
                  referObj['refer'].columnNumber
                )
                if (refer.id === media.refer && areMediaChildrenIgnored(refer, media)) {
                  redundantChild = true
                }
              })

              if (!searchRefers(media.availableRefers, media.refer as string)) {
                diagnostics.push(
                  `Error! Reused Media ID isn't valid (already reuses another media / not from Media element)! <media>`
                )
              } else {
                for (let k = 0; k < medias.length; k++) {
                  if (medias[k].id !== media.id) {
                    const children = medias[k].inner['childNodes']
                    for (let j = 0; j < children.length; j++) {
                      if (children[j].nodeType === 1) {
                        media.appendChild(children[j]) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }
                }
              }
            }
          } else if (media.refer.indexOf('#') > -1) {
            let applyDiagnostic = true
            let importIdExists = false
            const splitId: string[] = media.refer.split('#')

            if (!idDoesExist(importAliases, splitId[0])) {
              diagnostics.push(`Error! Import alias doesn't exist! <media>`)
            } else {
              for (let i = 0; i < importsArray.length; i++) {
                const importedMediaRefers: any[] = []
                importsArray[i]['importedMedias'].forEach(importedMedia => {
                  bodyIDs.push(...importedMedia.getChildrenIDRecursively(importedMedia.inner['childNodes']))

                  importedMediaRefers.push({
                    refer: importedMedia
                  })

                  if (importedMedia.id === splitId[1] && areMediaChildrenIgnored(importedMedia, media)) {
                    redundantChild = true
                  }

                  if (importedMedia.id === splitId[1]) {
                    for (let k = 0; k < importedMedia.inner['childNodes'].length; k++) {
                      const child = importedMedia.inner['childNodes'][k]
                      if (child.nodeType === 1) {
                        media.appendChild(child)
                      }
                    }
                  }
                })

                if (
                  importsArray[i]['alias'] === splitId[0] &&
                  idDoesExist(importsArray[i]['bodyIDs'], splitId[1])
                ) {
                  importIdExists ||= true
                  // console.log("Alias ==", importsArray[i]['alias'], "Data -->", importsArray[i]['importedContexts']);

                  const result =
                    !searchImportedBase(
                      importsArray[i]['alias'],
                      importsArray[i]['importedMedias'],
                      splitId[0],
                      splitId[1]
                    ) || !searchRefers(importedMediaRefers, splitId[1])
                  // console.log("result ==", result);
                  applyDiagnostic = applyDiagnostic && result
                  /*for (let j = 0; j < importsArray[i]['importedMedias'].length; j++) {
                  }*/

                  break
                }
              }

              if (!importIdExists) {
                diagnostics.push(`Error! Reused Media ID doesn't exist in imported document! <media>`)

                applyDiagnostic &&= false
              }

              // console.log(applyDiagnostic);
              if (applyDiagnostic) {
                diagnostics.push(
                  `Error! Reused Media ID isn't valid (already reuses another media / not from Media element)! <media>`
                )
              }
            }
          }
        }
        // console.log(redundantChild);
        if (redundantChild) {
          diagnostics.push(
            `Warning! A child element already exists in reused Media -> Redundant child element will be ignored! <media>`
          )
        }
      }

      for (let i = 0; i < effects.length; i++) {
        const effect = effects[i]
        if (effect.descriptorId && !(effect.descriptorId.indexOf('#') > -1)) {
          if (descriptorBases.length === 0) {
            // Caso não exista <descriptorBase>
            diagnostics.push(`Error! Referenced Descriptor ID doesn't exist! <effect>`)
          } else {
            descriptorBases.forEach(descriptorBase => {
              if (effect.descriptorId && descriptorBase) {
                if (!idDoesExist(headIDs, effect.descriptorId)) {
                  diagnostics.push(`Error! Referenced Descriptor ID doesn't exist! <effect>`)
                } else {
                  const descriptor = descriptorBase.findDescriptor(effect.descriptorId)
                  // console.log(media.descriptorId.indexOf("#") > -1);
                  if (!descriptor) {
                    // Referenced Descriptor ID isn't from a descriptor
                    diagnostics.push(`Error! Referenced Descriptor ID isn't from a descriptor! <effect>`)
                  }
                }
              }
            })
          }
        } else if (effect.descriptorId && effect.descriptorId.indexOf('#') > -1) {
          let applyDiagnostic = true
          const splitId: string[] = effect.descriptorId.split('#')

          if (!idDoesExist(importAliases, splitId[0])) {
            diagnostics.push(`Error! Import alias doesn't exist! <effect>`)
          } else {
            for (let i = 0; i < importsArray.length; i++) {
              for (let j = 0; j < importsArray[i]['importedDescriptorBases'].length; j++) {
                const result = !searchImportedBase(
                  importsArray[i]['alias'],
                  importsArray[i]['importedDescriptorBases'][j].descriptors,
                  splitId[0],
                  splitId[1]
                )
                // console.log("result ==", result);
                applyDiagnostic = applyDiagnostic && result
              }
            }
            importedDescriptors.forEach(importedDescriptor => {
              for (let i = 0; i < importedDescriptor['imports'].length; i++) {
                if (
                  importedDescriptor['imports'][i]['descriptors'] &&
                  importedDescriptor['imports'][i]['descriptors'].length > 0
                ) {
                  applyDiagnostic &&= !searchImportedBase(
                    importedDescriptor['importAlias'],
                    importedDescriptor['imports'][i]['descriptors'],
                    splitId[0],
                    splitId[1]
                  )
                }
              }
            })
            if (applyDiagnostic) {
              diagnostics.push(`Error! Referenced Descriptor ID doesn't exist in imported base! <effect>`)
            }
          }
        }

        let redundantChild = false

        if (effect.refer) {
          if (!(effect.refer.indexOf('#') > -1)) {
            // const referredMedia = bodyObj.findMedia(media.refer as string);
            if (!idDoesExist(bodyIDs, effect.refer)) {
              diagnostics.push(`Error! Reused Effect ID doesn't exist! <effect>`)
            } else {
              effect.availableRefers.forEach(referObj => {
                const refer: NCLMedia = new NCLMedia(
                  referObj['refer'].element,
                  referObj['refer'].lineNumber,
                  referObj['refer'].columnNumber
                )
                if (refer.id === effect.refer && areMediaChildrenIgnored(refer, effect)) {
                  redundantChild = true
                }
              })

              if (!searchRefers(effect.availableRefers, effect.refer as string)) {
                diagnostics.push(
                  `Error! Reused Effect ID isn't valid (already reuses another effect / not from Effect element)! <effect>`
                )
              } else {
                for (let k = 0; k < medias.length; k++) {
                  if (medias[k].id !== effect.id) {
                    const children = medias[k].inner['childNodes']
                    for (let j = 0; j < children.length; j++) {
                      if (children[j].nodeType === 1) {
                        effect.appendChild(children[j]) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }
                }
              }
            }
          } else if (effect.refer.indexOf('#') > -1) {
            let applyDiagnostic = true
            let importIdExists = false
            const splitId: string[] = effect.refer.split('#')

            if (!idDoesExist(importAliases, splitId[0])) {
              diagnostics.push(`Error! Import alias doesn't exist! <effect>`)
            } else {
              for (let i = 0; i < importsArray.length; i++) {
                const importedEffectRefers: any[] = []
                importsArray[i]['importedEffects'].forEach(importedEffect => {
                  bodyIDs.push(...importedEffect.getChildrenIDRecursively(importedEffect.inner['childNodes']))

                  importedEffectRefers.push({
                    refer: importedEffect
                  })

                  if (importedEffect.id === splitId[1] && areEffectChildrenIgnored(importedEffect, effect)) {
                    redundantChild = true
                  }

                  if (importedEffect.id === splitId[1]) {
                    for (let k = 0; k < importedEffect.inner['childNodes'].length; k++) {
                      const child = importedEffect.inner['childNodes'][k]
                      if (child.nodeType === 1) {
                        effect.appendChild(child) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }
                })

                if (
                  importsArray[i]['alias'] === splitId[0] &&
                  idDoesExist(importsArray[i]['bodyIDs'], splitId[1])
                ) {
                  importIdExists ||= true
                  // console.log("Alias ==", importsArray[i]['alias'], "Data -->", importsArray[i]['importedContexts']);

                  const result =
                    !searchImportedBase(
                      importsArray[i]['alias'],
                      importsArray[i]['importedEffects'],
                      splitId[0],
                      splitId[1]
                    ) || !searchRefers(importedEffectRefers, splitId[1])
                  // console.log("result ==", result);
                  applyDiagnostic = applyDiagnostic && result
                  /*for (let j = 0; j < importsArray[i]['importedMedias'].length; j++) {
                  }*/

                  break
                }
              }

              if (!importIdExists) {
                diagnostics.push(`Error! Reused Effect ID doesn't exist in imported document! <effect>`)
                applyDiagnostic &&= false
              }

              // console.log(applyDiagnostic);
              if (applyDiagnostic) {
                diagnostics.push(
                  `Error! Reused Effect ID isn't valid (already reuses another effect / not from Effect element)! <effect>`
                )
              }
            }
          }
        }
        // console.log(redundantChild);
        if (redundantChild) {
          diagnostics.push(
            `Warning! A child element already exists in reused Effect -> Redundant child element will be ignored! <effect>`
          )
        }
      }

      for (let i = 0; i < links.length; i++) {
        const link = links[i]
        if (link.connectorId && !(link.connectorId.indexOf('#') > -1)) {
          if (connectorBases.length === 0) {
            // Caso não exista <connectorBase>
            diagnostics.push(`Error! Referenced Connector ID doesn't exist! <link>`)
          } else {
            connectorBases.forEach(connectorBase => {
              if (link.connectorId && connectorBase) {
                if (!idDoesExist(headIDs, link.connectorId)) {
                  diagnostics.push(`Error! Referenced Connector ID doesn't exist! <link>`)
                } else {
                  const connector = connectorBase.findConnector(link.connectorId)

                  if (!connector) {
                    // Referenced Connector ID isn't from a connector
                    diagnostics.push(`Error! Referenced Connector ID isn't from a connector! <link>`)
                  } else if (connector) {
                    const connActions = connector.actions['simpleActions']
                    const connConditions = connector.conditions['simpleConditions']

                    let limitMet = true
                    if (link.currentRoles.length > 0) {
                      connActions.forEach(actionObj => {
                        let foundRole = false
                        link.currentRoles.forEach(roleObj => {
                          if (actionObj['role'] === roleObj['role']) {
                            foundRole = true
                            if (actionObj['minValue'] > roleObj['count']) {
                              limitMet = false
                            }
                          }
                        })

                        if (!foundRole || !limitMet) {
                          diagnostics.push(
                            `Error! '${actionObj['role']}' Role count does not meet minimum usage limit! <link>`
                          )
                        }
                      })

                      connConditions.forEach(conditionObj => {
                        let foundRole = false
                        link.currentRoles.forEach(roleObj => {
                          if (conditionObj['role'] === roleObj['role']) {
                            foundRole = true
                            if (conditionObj['minValue'] > roleObj['count']) {
                              limitMet = false
                            }
                          }
                        })

                        if (!foundRole || !limitMet) {
                          diagnostics.push(
                            `Error! '${conditionObj['role']}' Role count does not meet minimum usage limit! <link>`
                          )
                        }
                      })
                    } else {
                      diagnostics.push(`Error! Link roles do not meet usage limit! <link>`)
                    }

                    const linkParams = link.linkParams
                    for (let j = 0; j < linkParams.length; j++) {
                      let paramExists = false
                      if (linkParams[j].name) {
                        paramExists = connector.findConnectorParam(linkParams[j].name as string)
                          ? true
                          : false
                      }

                      if (!paramExists) {
                        diagnostics.push(
                          `Error! Parameter name does not exist in referenced Connector! <linkParam>`
                        )
                      }
                    }
                    // console.log(link.currentRoles);
                  }
                }
              }
            })
          }
        } else if (link.connectorId && link.connectorId.indexOf('#') > -1) {
          let applyDiagnostic = true
          const splitId: string[] = link.connectorId.split('#')

          if (!idDoesExist(importAliases, splitId[0])) {
            diagnostics.push(`Error! Import alias doesn't exist! <link>`)
          } else {
            let foundBase = false
            for (let i = 0; i < importsArray.length; i++) {
              if (importsArray[i]['alias'] === splitId[0]) {
                foundBase = true

                for (let j = 0; j < importsArray[i]['importedConnectorBases'].length; j++) {
                  const result = !searchImportedBase(
                    importsArray[i]['alias'],
                    importsArray[i]['importedConnectorBases'][j].connectors,
                    splitId[0],
                    splitId[1]
                  )
                  // console.log("result ==", result);
                  applyDiagnostic = applyDiagnostic && result

                  const connectorBase: NCLConnectorBase = importsArray[i]['importedConnectorBases'][j]
                  const connector = connectorBase.findConnector(splitId[1])

                  if (connector) {
                    const connActions = connector.actions['simpleActions']
                    const connConditions = connector.conditions['simpleConditions']

                    let limitMet = true
                    if (link.currentRoles.length > 0) {
                      connActions.forEach(actionObj => {
                        let foundRole = false
                        link.currentRoles.forEach(roleObj => {
                          if (actionObj['role'] === roleObj['role']) {
                            foundRole = true
                            if (actionObj['minValue'] > roleObj['count']) {
                              limitMet = false
                            }
                          }
                        })
                        if (!foundRole || !limitMet) {
                          diagnostics.push(
                            `Error! '${actionObj['role']}' Role count does not meet minimum usage limit! <link>`
                          )
                        }
                      })

                      connConditions.forEach(conditionObj => {
                        let foundRole = false
                        link.currentRoles.forEach(roleObj => {
                          if (conditionObj['role'] === roleObj['role']) {
                            foundRole = true
                            if (conditionObj['minValue'] > roleObj['count']) {
                              limitMet = false
                            }
                          }
                        })

                        if (!foundRole || !limitMet) {
                          // diagnostics.push({
                          //   severity: vscode.DiagnosticSeverity.Error,
                          //   message: `Error! '${conditionObj['role']}' Role count does not meet minimum usage limit! <link>`,
                          //   code: 'limit-not-met',
                          //   source: 'NCLDevTool',
                          //   range: new vscode.Range(link.lineNumber - 1, link.columnNumber - 1, link.lineNumber - 1, (link.tagName.length + link.columnNumber))
                          // });
                          diagnostics.push(
                            `Error! '${conditionObj['role']}' Role count does not meet minimum usage limit! <link>`
                          )
                        }
                      })
                    } else {
                      diagnostics.push(`Error! Link roles do not meet usage limit! <link>`)
                    }

                    const linkParams = link.linkParams
                    for (let j = 0; j < linkParams.length; j++) {
                      let paramExists = false
                      if (linkParams[j].name) {
                        paramExists = connector.findConnectorParam(linkParams[j].name as string)
                          ? true
                          : false
                      }

                      if (!paramExists) {
                        diagnostics.push(
                          `Error! Parameter name does not exist in referenced Connector! <linkParam>`
                        )
                      }
                    }
                  }
                }
              }
            }

            if (!foundBase) {
              importedConnectors.forEach(importedConnector => {
                // console.log(importedConnector);
                if (importedConnector['importAlias'] === splitId[0]) {
                  for (let i = 0; i < importedConnector['imports'].length; i++) {
                    if (
                      importedConnector['imports'][i]['connectors'] &&
                      importedConnector['imports'][i]['connectors'].length > 0
                    ) {
                      applyDiagnostic &&= !searchImportedBase(
                        importedConnector['importAlias'],
                        importedConnector['imports'][i]['connectors'],
                        splitId[0],
                        splitId[1]
                      )

                      for (let j = 0; j < importedConnector['imports'][i]['connectors'].length; j++) {
                        const connector: NCLConnector = importedConnector['imports'][i]['connectors'][j]
                        if (connector.id === splitId[1]) {
                          const linkParams = link.linkParams
                          for (let k = 0; k < linkParams.length; k++) {
                            let paramExists = false
                            if (linkParams[k].name) {
                              paramExists = connector.findConnectorParam(linkParams[k].name as string)
                                ? true
                                : false
                            }

                            if (!paramExists) {
                              diagnostics.push(
                                `Error! Parameter name does not exist in referenced Connector! <linkParam>`
                              )
                            }
                          }

                          const connActions = connector.actions['simpleActions']
                          const connConditions = connector.conditions['simpleConditions']

                          let limitMet = true
                          if (link.currentRoles.length > 0) {
                            connActions.forEach(actionObj => {
                              let foundRole = false
                              link.currentRoles.forEach(roleObj => {
                                if (actionObj['role'] === roleObj['role']) {
                                  foundRole = true
                                  if (actionObj['minValue'] > roleObj['count']) {
                                    limitMet = false
                                  }
                                }
                              })
                              if (!foundRole || !limitMet) {
                                diagnostics.push(
                                  `Error! '${actionObj['role']}' Role count does not meet minimum usage limit! <link>`
                                )
                              }
                            })

                            connConditions.forEach(conditionObj => {
                              let foundRole = false
                              link.currentRoles.forEach(roleObj => {
                                if (conditionObj['role'] === roleObj['role']) {
                                  foundRole = true
                                  if (conditionObj['minValue'] > roleObj['count']) {
                                    limitMet = false
                                  }
                                }
                              })

                              if (!foundRole || !limitMet) {
                                diagnostics.push(
                                  `Error! '${conditionObj['role']}' Role count does not meet minimum usage limit! <link>`
                                )
                              }
                            })
                          } else {
                            diagnostics.push(`Error! Link roles do not meet usage limit! <link>`)
                          }
                        }
                      }
                    }
                  }
                }
              })
            }
            // console.log(applyDiagnostic);
            if (applyDiagnostic) {
              diagnostics.push(`Error! Referenced Connector ID doesn't exist in imported base! <link>`)
            }
          }
        }
      }

      switches.forEach(swt => {
        // console.log(port.availableComponents);
        const swtRefers = swt.availableRefers
        swtRefers.push({
          refer: bodyObj
        })

        if (swt.refer) {
          if (swt.refer && swt.childNodes.length > 0) {
            diagnostics.push(
              `Warning! This element reuses another - Child elements will be ignored! <switch>`
            )
          }

          if (!(swt.refer.indexOf('#') > -1)) {
            if (!idDoesExist(bodyIDs, swt.refer)) {
              diagnostics.push(`Error! Reused Switch ID doesn't exist! <switch>`)
            } else {
              if (
                reusedIsChild(
                  swt.getChildNodesRecursively(swt),
                  swt.refer
                ) /*swt.refer && swt.refer === cNode.id*/
              ) {
                diagnostics.push(`Error! Attribute 'refer' references child node! <switch>`)
              } else if (reusedIsAncestor(swt.parentNodes, swt.refer) /*swt.refer === swt.parentNode?.id*/) {
                diagnostics.push(`Error! Attribute 'refer' references ancestor node! <switch>`)
              } else if (!searchRefers(swtRefers, swt.refer as string)) {
                diagnostics.push(
                  `Error! Reused Switch ID isn't valid (already reuses another switch / not from Switch element)! <switch>`
                )
              } else {
                for (let k = 0; k < switches.length; k++) {
                  if (switches[k].id !== swt.id) {
                    const children = switches[k].inner['childNodes']
                    for (let j = 0; j < children.length; j++) {
                      if (children[j].nodeType === 1) {
                        swt.appendChild(children[j]) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }
                }
              }
            }
          } else if (swt.refer.indexOf('#') > -1) {
            let applyDiagnostic = true
            let importIdExists = false
            const splitId: string[] = swt.refer.split('#')

            if (!idDoesExist(importAliases, splitId[0])) {
              diagnostics.push(`Error! Import alias doesn't exist! <switch>`)
            } else {
              for (let i = 0; i < importsArray.length; i++) {
                const importedSwtRefers: any[] = []
                importsArray[i]['importedSwitches'].forEach(importedSwitch => {
                  bodyIDs.push(...importedSwitch.getChildrenIDRecursively(importedSwitch.inner['childNodes']))

                  if (importedSwitch.id === splitId[1]) {
                    for (let k = 0; k < importedSwitch.inner['childNodes'].length; k++) {
                      const child = importedSwitch.inner['childNodes'][k]
                      if (child.nodeType === 1) {
                        swt.appendChild(child) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }

                  importedSwtRefers.push({
                    refer: importedSwitch
                  })
                })
                // console.log(":)", importsArray[i]['bodyIDs']);
                if (
                  importsArray[i]['alias'] === splitId[0] &&
                  idDoesExist(importsArray[i]['bodyIDs'], splitId[1])
                ) {
                  importIdExists ||= true

                  const result =
                    !searchImportedBase(
                      importsArray[i]['alias'],
                      importsArray[i]['importedSwitches'],
                      splitId[0],
                      splitId[1]
                    ) || !searchRefers(importedSwtRefers, splitId[1])
                  // console.log("result ==", result);
                  applyDiagnostic = applyDiagnostic && result
                  /*for (let j = 0; j < importsArray[i]['importedSwitches'].length; j++) {
                  }*/
                  break
                }
              }
              // console.log(applyDiagnostic);
              if (!importIdExists) {
                diagnostics.push(`Error! Reused Switch ID doesn't exist in imported document! <switch>`)
                applyDiagnostic &&= false
              }

              if (applyDiagnostic) {
                diagnostics.push(
                  `Error! Reused Switch ID isn't valid (already reuses another switch / not from Switch element)! <switch>`
                )
              }
            }
          }
        }
      })

      contexts.forEach(context => {
        // console.log(port.availableComponents);
        const ctxRefers = context.availableRefers
        ctxRefers.push({
          refer: bodyObj
        })
        if (context.refer) {
          if (context.childNodes.length > 0) {
            // diagnostics.push({
            //   severity: vscode.DiagnosticSeverity.Warning,
            //   message: `Warning! This element reuses another - Child elements will be ignored! <context>`,
            //   code: 'ignored-code',
            //   source: 'NCLDevTool',
            //   range: new vscode.Range(context.lineNumber - 1, context.columnNumber - 1, context.lineNumber - 1, (context.tagName.length + context.columnNumber))
            // });
            diagnostics.push(
              `Warning! This element reuses another - Child elements will be ignored! <context>`
            )
          }

          if (!(context.refer.indexOf('#') > -1)) {
            if (!idDoesExist(bodyIDs, context.refer)) {
              diagnostics.push(`Error! Reused Context ID doesn't exist! <context>`)
            } else {
              if (
                reusedIsChild(
                  context.getChildNodesRecursively(context),
                  context.refer
                ) /*context.refer && context.refer === cNode.id*/
              ) {
                diagnostics.push(`Error! Attribute 'refer' references child node! <context>`)
              } else if (
                reusedIsAncestor(
                  context.parentNodes,
                  context.refer
                ) /*context.refer === context.parentNode?.id*/
              ) {
                diagnostics.push(`Error! Attribute 'refer' references ancestor node! <context>`)
              } else if (!searchRefers(ctxRefers, context.refer as string)) {
                diagnostics.push(
                  `Error! Reused Context ID isn't valid (already reuses another context / not from Context element)! <context>`
                )
              } else {
                for (let k = 0; k < contexts.length; k++) {
                  if (contexts[k].id !== context.id) {
                    const children = contexts[k].inner['childNodes']
                    for (let j = 0; j < children.length; j++) {
                      if (children[j].nodeType === 1) {
                        context.appendChild(children[j]) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }
                }
              }
            }
          } else if (context.refer.indexOf('#') > -1) {
            let applyDiagnostic = true
            let importIdExists = false
            const splitId: string[] = context.refer.split('#')
            if (!idDoesExist(importAliases, splitId[0])) {
              diagnostics.push(`Error! Import alias doesn't exist! <context>`)
            } else {
              for (let i = 0; i < importsArray.length; i++) {
                // console.log("KKK", importsArray[i]['importedContexts']);
                const importedCtxRefers: any[] = []
                importsArray[i]['importedContexts'].forEach(importedContext => {
                  bodyIDs.push(
                    ...importedContext.getChildrenIDRecursively(importedContext.inner['childNodes'])
                  )

                  if (importedContext.id === splitId[1]) {
                    for (let k = 0; k < importedContext.inner['childNodes'].length; k++) {
                      const child = importedContext.inner['childNodes'][k]
                      if (child.nodeType === 1) {
                        context.appendChild(child) // Adicionar filhos do elemento reusado no elemento que o reúsa,
                        // para permitir referência as esses filhos em "interface"
                      }
                    }
                  }

                  importedCtxRefers.push({
                    refer: importedContext
                  })
                })

                if (
                  importsArray[i]['alias'] === splitId[0] &&
                  idDoesExist(importsArray[i]['bodyIDs'], splitId[1])
                ) {
                  importIdExists ||= true
                  // console.log("Alias ==", importsArray[i]['alias'], "Data -->", importsArray[i]['importedContexts']);

                  const result =
                    !searchImportedBase(
                      importsArray[i]['alias'],
                      importsArray[i]['importedContexts'],
                      splitId[0],
                      splitId[1]
                    ) || !searchRefers(importedCtxRefers, splitId[1])
                  // console.log("result ==", result);
                  applyDiagnostic = applyDiagnostic && result

                  /*for (let j = 0; j < importsArray[i]['importedContexts'].length; j++) {
                  }*/
                  break
                }
              }

              if (!importIdExists) {
                diagnostics.push(`Error! Reused Context ID doesn't exist in imported document! <context>`)
                applyDiagnostic &&= false
              }

              // console.log(applyDiagnostic);
              if (applyDiagnostic) {
                diagnostics.push(
                  `Error! Reused Context ID isn't valid (already reuses another context or body / not from Context or Body element)! <context>`
                )
              }
            }
          }
        }
      })

      binds.forEach(bind => {
        if (bind.component) {
          if (!idDoesExist(bodyIDs, bind.component)) {
            diagnostics.push(`Error! Referenced Component ID doesn't exist! <bind>`)
          } else if (!searchComponents(bind.availableComponents, bind.component as string)) {
            diagnostics.push(
              `Error! Referenced Component ID isn't valid (not from Media / Context / Switch / Effect / Same composition)! <bind>`
            )
          }
        }

        if (bind.interface) {
          if (!idDoesExist(bodyIDs, bind.interface)) {
            diagnostics.push(`Error! Referenced Interface ID doesn't exist! <bind>`)
          } else if (
            !searchInterfaces(bind.availableRefs, bind.interface as string, bind.component as string)
          ) {
            diagnostics.push(`Error! Referenced Interface ID isn't valid for current Component! <bind>`)
          }
        }

        if (bind.descriptorId) {
          if (descriptorBases.length === 0) {
            // Caso não exista <descriptorBase>
            diagnostics.push(`Error! Referenced Descriptor ID doesn't exist! <bind>`)
          } else {
            descriptorBases.forEach(descriptorBase => {
              if (!idDoesExist(headIDs, bind.descriptorId as string)) {
                diagnostics.push(`Error! Referenced Descriptor ID doesn't exist! <bind>`)
              } else {
                const descriptor = descriptorBase.findDescriptor(bind.descriptorId as string)

                if (!descriptor) {
                  // Referenced Descriptor ID isn't from a descriptor
                  diagnostics.push(`Error! Referenced Descriptor ID isn't from a descriptor! <bind>`)
                }
              }
            })
          }
        }

        let roleNotAvailable = true
        let roleUnusable = true

        const pLink = bind.parentLink

        if (pLink && pLink.connectorId && !(pLink.connectorId.indexOf('#') > -1)) {
          connectorBases.forEach(connectorBase => {
            const roleObj = bind.getAvailableRoles(connectorBase)
            // let parentLink: any = bind.parentNode;
            // console.log(roleObj);

            const connector = connectorBase.findConnector(pLink.connectorId as string)
            if (connector) {
              const bindParams = bind.bindParams
              for (let j = 0; j < bindParams.length; j++) {
                let paramExists = false
                if (bindParams[j].name) {
                  paramExists = connector.findConnectorParam(bindParams[j].name as string) ? true : false
                }

                if (!paramExists) {
                  diagnostics.push(
                    `Error! Parameter name does not exist in referenced Connector! <bindParam>`
                  )
                }
              }
            }

            if (pLink) {
              // parentLink = new NCLLink(parentLink.element, parentLink.lineNumber, parentLink.columnNumber);
              const result = pLink.currentRoles

              const currentBind = bind.inner['attributes'].getNamedItem('role')

              const role = currentBind ? currentBind.nodeValue : ''
              // console.log(parentLink.id, "kk", role, '\n');
              if (isRoleAvailable(roleObj, role)) {
                roleNotAvailable = false
              }

              if (canRoleBeUsed(roleObj, role, result)) {
                roleUnusable = false
              }
            }
          })
        } else if (pLink && pLink.connectorId && pLink.connectorId.indexOf('#') > -1) {
          const splitId: string[] = pLink.connectorId.split('#')
          let foundBase = false
          for (let i = 0; i < importsArray.length; i++) {
            if (importsArray[i]['alias'] === splitId[0]) {
              foundBase = true
              for (let j = 0; j < importsArray[i]['importedConnectorBases'].length; j++) {
                const connectorBase = importsArray[i]['importedConnectorBases'][j]

                const connector = connectorBase.findConnector(splitId[1])
                if (connector) {
                  const bindParams = bind.bindParams
                  for (let j = 0; j < bindParams.length; j++) {
                    let paramExists = false
                    if (bindParams[j].name) {
                      paramExists = connector.findConnectorParam(bindParams[j].name as string) ? true : false
                    }

                    if (!paramExists) {
                      diagnostics.push(
                        `Error! Parameter name does not exist in referenced Connector! <bindParam>`
                      )
                    }
                  }
                }

                // Verificar se roles usados nos binds estão presentes no xconnector selecionado e se não já estão sendo utilizadas por outros binds do mesmo link
                const roleObj = bind.getAvailableRoles(connectorBase)
                // let parentLink: any = bind.parentNode;

                if (pLink) {
                  // parentLink = new NCLLink(parentLink.element, parentLink.lineNumber, parentLink.columnNumber);
                  const result = pLink.currentRoles

                  const currentBind = bind.inner['attributes'].getNamedItem('role')

                  const role = currentBind ? currentBind.nodeValue : ''

                  if (isRoleAvailable(roleObj, role)) {
                    roleNotAvailable = false
                  }

                  if (canRoleBeUsed(roleObj, role, result)) {
                    roleUnusable = false
                  }
                }
              }
            }
          }

          if (!foundBase) {
            importedConnectors.forEach(importedConnector => {
              if (splitId[0] === importedConnector['importAlias']) {
                const connectorObjs = importedConnector['imports']
                // console.log(importedConnector);
                for (let i = 0; i < connectorObjs.length; i++) {
                  // console.log(":)", connectorObjs);

                  /*const connector = connectorBase.findConnector(pLink.connectorId as string);
                  if (connector) {
                    const bindParams = bind.bindParams;
                    for (let j = 0; j < bindParams.length; j++) {
                      let paramExists = false;
                      if (bindParams[j].name) {
                        paramExists = connector.findConnectorParam(bindParams[j].name as string) ? true : false;
                      }

                      if (!paramExists) {
                        diagnostics.push({
                          severity: vscode.DiagnosticSeverity.Error,
                          message: `Error! Parameter name does not exist in referenced Connector! <bindParam>`,
                          code: 'non-existent-parameter',
                          source: 'NCLDevTool',
                          range: new vscode.Range(bindParams[j].lineNumber-1, bindParams[j].columnNumber-1, bindParams[j].lineNumber-1, (bindParams[j].tagName.length + bindParams[j].columnNumber))
                        });
                      }
                    }
                  }*/

                  for (let j = 0; j < connectorObjs[i]['connectors'].length; j++) {
                    // Verificar se roles usadas nos binds estão presentes no xconnector selecionado e se não já estão sendo utilizadas por outros binds do mesmo link
                    const connector = connectorObjs[i]['connectors'][j]
                    if (splitId[1] === connector.id) {
                      const bindParams = bind.bindParams
                      for (let j = 0; j < bindParams.length; j++) {
                        let paramExists = false
                        if (bindParams[j].name) {
                          paramExists = connector.findConnectorParam(bindParams[j].name as string)
                            ? true
                            : false
                        }

                        if (!paramExists) {
                          diagnostics.push(
                            `Error! Parameter name does not exist in referenced Connector! <bindParam>`
                          )
                        }
                      }

                      const roleObj = {
                        simpleConditions: new Array(),
                        simpleActions: new Array()
                      }

                      const conditions = connector.conditions
                      const actions = connector.actions

                      /*console.log(conditions);
                      console.log(actions);*/

                      roleObj['simpleActions'].push(...actions['simpleActions'])
                      roleObj['simpleConditions'].push(...conditions['simpleConditions'])

                      let parentLink: any = bind.parentNode

                      if (parentLink) {
                        parentLink = new NCLLink(
                          parentLink.element,
                          parentLink.lineNumber,
                          parentLink.columnNumber
                        )
                        const result = parentLink.currentRoles

                        const currentBind = bind.inner['attributes'].getNamedItem('role')

                        const role = currentBind ? currentBind.nodeValue : ''

                        if (isRoleAvailable(roleObj, role)) {
                          roleNotAvailable = false
                        }

                        if (canRoleBeUsed(roleObj, role, result)) {
                          roleUnusable = false
                        }
                      }
                    }
                  }
                }
              }
            })
          }
        }

        if (roleNotAvailable) {
          diagnostics.push(`Error! Role doesn't exist in referenced Connector! <bind>`)
        }

        if (roleUnusable && !roleNotAvailable) {
          diagnostics.push(`Error! Referenced role exceeds usage limit (more / less than allowed)! <bind>`)
        }
      })

      ports.forEach(port => {
        // console.log(port.availableComponents);
        if (port.component) {
          if (!idDoesExist(bodyIDs, port.component)) {
            diagnostics.push(`Error! Referenced Component ID doesn't exist! <port>`)
          } else if (!searchComponents(port.availableComponents, port.component as string)) {
            diagnostics.push(
              `Error! Referenced Component ID isn't valid (not from Media / Context / Switch / Same composition)! <port>`
            )
          }
        }

        if (port.interface) {
          if (!idDoesExist(bodyIDs, port.interface)) {
            diagnostics.push(`Error! Referenced Interface ID doesn't exist! <port>`)
          } else if (
            !searchInterfaces(port.availableRefs, port.interface as string, port.component as string)
          ) {
            diagnostics.push(`Error! Referenced Interface ID isn't valid for current Component! <port>`)
          }
        }
      })

      mappings.forEach(mapping => {
        // console.log(port.availableComponents);
        if (mapping.component) {
          if (!idDoesExist(bodyIDs, mapping.component)) {
            diagnostics.push(`Error! Referenced Component ID doesn't exist! <mapping>`)
          } else if (!searchComponents(mapping.availableComponents, mapping.component as string)) {
            diagnostics.push(
              `Error! Referenced Component ID isn't valid (not from Media / Context / Switch / Same composition)! <mapping>`
            )
          }
        }

        if (mapping.interface) {
          if (!idDoesExist(bodyIDs, mapping.interface)) {
            diagnostics.push(`Error! Referenced Interface ID doesn't exist! <mapping>`)
          } else if (
            !searchInterfaces(mapping.availableRefs, mapping.interface as string, mapping.component as string)
          ) {
            diagnostics.push(`Error! Referenced Interface ID isn't valid for current Component! <mapping>`)
          }
        }
      })

      defaultComponents.forEach(dc => {
        if (dc.component) {
          if (!idDoesExist(bodyIDs, dc.component)) {
            diagnostics.push(`Error! Referenced Component ID doesn't exist! <defaultComponent>`)
          } else if (!searchComponents(dc.availableComponents, dc.component as string)) {
            diagnostics.push(
              `Error! Referenced Component ID isn't valid (not child from Switch / DescriptorSwitch / Same composition)! <defaultComponent>`
            )
          }
        }
      })
      // ---------------------------------------------------- || ----------------------------------------------------
    }

    return diagnostics
  }
}

export function idDoesExist(idList: string[], id: string) {
  for (let i = 0; i < idList.length; i++) {
    if (id === idList[i]) {
      return true
    }
  }

  return false
}

export function reusedIsAncestor(parentList: NCLElement[], referId: string): boolean {
  for (let i = 0; i < parentList.length; i++) {
    if (parentList[i].id === referId) {
      return true
    }
  }

  return false
}

export function reusedIsChild(childList: NCLElement[], referId: string): boolean {
  for (let i = 0; i < childList.length; i++) {
    if (childList[i].id === referId) {
      return true
    }
  }

  return false
}

export function searchImportedBase(
  importAlias: string,
  base: NCLElement[],
  selectedAlias: string,
  selectedId: string
): boolean {
  for (let i = 0; i < base.length; i++) {
    const elem = base[i]
    if (selectedAlias === importAlias && selectedId === elem.id) {
      // console.log(selectedId);
      return true
    }
  }
  /*base.forEach(elem => {
    console.log(importAlias+"#"+elem.id);
    console.log(selectedAlias);
    console.log(selectedId);
    if (selectedAlias === importAlias && selectedId === elem.id) {
      return true;
    }
  });*/

  return false
}

export function importBase(
  parentNode: string,
  currentDocURI: string,
  documentURI: string,
  documentBaseId: string = '',
  domParser: any
): any {
  const uri = currentDocURI.substring(1, currentDocURI.lastIndexOf('/')) + '/' + documentURI

  // const doc = await vscode.workspace.openTextDocument(uri);
  let doc
  try {
    doc = fs.readFileSync('/' + uri, 'utf-8')
  } catch (e: any) {
    throw new Error(e)
  }
  // console.log(doc);

  const domObj = new domParser({
    /**
     * locator is always need for error position info
     */
    locator: {},
    /**
     * you can override the errorHandler for xml parser
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    errorHandler: {
      warning: (w: string) => {
        console.warn(w)
      },
      error: () => {
        console.error('Imported document no found!')
        return []
      }, // <-- callback
      fatalError: () => {
        console.error('!!')
      } // <-- callback
    }
    //only callback model
    //errorHandler:function(level,msg){console.log(level,msg)}
  }).parseFromString(doc /*.getText()*/, 'text/xml')

  const docHead = domObj.getElementsByTagName('head')[0]
  const headObj = new NCLHead(docHead, docHead.lineNumber, docHead.columnNumber)

  const regionBases: NCLRegionBase[] = headObj.regionBases
  const descriptorBases: NCLDescriptorBase[] = headObj.descriptorBases
  const connectorBases: NCLConnectorBase[] = headObj.connectorBases

  let connectorsObj = []
  let descriptorsObj: any = []
  let regionsObj = []

  switch (parentNode) {
    case 'connectorBase':
      for (let i = 0; i < connectorBases.length; i++) {
        if (documentBaseId && connectorBases[i].id === documentBaseId) {
          const aux = connectorBases[i] ? connectorBases[i].connectors : []
          return [{ connectors: aux, importedBaseId: connectorBases[i].id }]
        }
        const aux = connectorBases[i] ? connectorBases[i].connectors : []
        connectorsObj.push({ connectors: aux, importedBaseId: connectorBases[i].id })
      }

      return connectorsObj
    case 'descriptorBase':
      for (let i = 0; i < descriptorBases.length; i++) {
        const aux = [
          {
            descriptors: descriptorBases[i] ? descriptorBases[i].descriptors : [],
            importedBaseId: descriptorBases[i].id
          }
        ]
        if (documentBaseId && descriptorBases[i].id === documentBaseId) {
          //console.log("ID DE DESCRITOR É IGUAL!!!");
          descriptorsObj = aux
          break
        }
        descriptorsObj.push({
          descriptors: descriptorBases[i].descriptors,
          importedBaseId: descriptorBases[i].id
        })
      }
    case 'regionBase':
      //console.log("VEIO PRA CA!!!", descriptorsObj);
      for (let i = 0; i < regionBases.length; i++) {
        const aux = [
          { regions: regionBases[i] ? regionBases[i].regions : [], importedBaseId: regionBases[i].id }
        ]
        if (documentBaseId && regionBases[i].id === documentBaseId && parentNode === 'regionBase') {
          return [{ regionObjs: new Array(...aux), descriptorObjs: descriptorsObj }]
        }
        regionsObj.push({ regions: regionBases[i].regions, importedBaseId: regionBases[i].id })
      }

      //console.log("Aha", descriptorsObj);
      return [{ regionObjs: regionsObj, descriptorObjs: descriptorsObj }]
  }
}

export function importDocuments(
  currentDocURI: string,
  documentURI: string,
  documentAlias: string,
  domParser: any
): {
  alias: string
  importedRegionBases: any[]
  importedConnectorBases: any[]
  importedDescriptorBases: any[]
  importedMedias: NCLMedia[]
  importedContexts: NCLContext[]
  importedSwitches: NCLSwitch[]
  importedEffects: NCLEffect[]
  headIDs: string[]
  bodyIDs: string[]
} {
  const importsObj = {
    alias: documentAlias,
    importedRegionBases: new Array<any>(),
    importedConnectorBases: new Array<any>(),
    importedDescriptorBases: new Array<any>(),
    importedMedias: new Array<NCLMedia>(),
    importedContexts: new Array<NCLContext>(),
    importedSwitches: new Array<NCLSwitch>(),
    importedEffects: new Array<NCLEffect>(),
    headIDs: new Array<string>(),
    bodyIDs: new Array<string>()
  }

  // console.log(currentDocURI.substring(1, currentDocURI.lastIndexOf('/')) + '/' + documentURI);

  const uri = currentDocURI.substring(1, currentDocURI.lastIndexOf('/')) + '/' + documentURI

  // const doc = await vscode.workspace.openTextDocument(uri);
  let doc
  try {
    doc = fs.readFileSync('/' + uri, 'utf-8')
  } catch (e: any) {
    throw new Error(e)
  }

  const domObj = new domParser({
    /**
     * locator is always need for error position info
     */
    locator: {},
    /**
     * you can override the errorHandler for xml parser
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    errorHandler: {
      warning: (w: string) => {
        console.warn(w)
      },
      error: () => {
        console.error('Imported document no found!')
        return []
      }, // <-- callback
      fatalError: () => {
        console.error('!!')
      } // <-- callback
    }
    //only callback model
    //errorHandler:function(level,msg){console.log(level,msg)}
  }).parseFromString(doc /*.getText()*/, 'text/xml')

  const docNcl = domObj.getElementsByTagName('ncl')[0]

  const docBody = domObj.getElementsByTagName('body')[0]
  const bodyObj = new NCLBody(docBody, docBody.lineNumber, docBody.columnNumber)

  const docHead = domObj.getElementsByTagName('head')[0]
  const headObj = new NCLHead(docHead, docHead.lineNumber, docHead.columnNumber)

  const bodyIDs = bodyObj.getChildrenIDRecursively(bodyObj.inner['childNodes'])
  const headIDs = headObj.getChildrenIDRecursively(headObj.inner['childNodes'])

  importsObj['headIDs'].push(...headIDs)
  importsObj['bodyIDs'].push(...bodyIDs)

  const regionBases: NCLRegionBase[] = headObj.regionBases
  const descriptorBases: NCLDescriptorBase[] = headObj.descriptorBases
  const connectorBases: NCLConnectorBase[] = headObj.connectorBases

  const connectors = []
  connectors.push(...connectorBases)
  importsObj['importedConnectorBases'].push(...connectors)

  const regions = []
  regions.push(...regionBases)
  importsObj['importedRegionBases'].push(...regions)

  const descriptors = []
  descriptors.push(...descriptorBases)
  importsObj['importedDescriptorBases'].push(...descriptors)

  const docMedias = domObj.getElementsByTagName('media')
  const medias: NCLMedia[] = []
  for (let i = 0; i < docMedias.length; i++) {
    const importMedia = new NCLMedia(docMedias[i], docMedias[i].lineNumber, docMedias[i].columnNumber)
    if (!importMedia.refer) {
      medias.push(importMedia)
    }
  }

  const docEffects = domObj.getElementsByTagName('effect')
  const effects: NCLEffect[] = []
  for (let i = 0; i < docEffects.length; i++) {
    effects.push(new NCLEffect(docEffects[i], docEffects[i].lineNumber, docEffects[i].columnNumber))
  }

  const docContexts = domObj.getElementsByTagName('context')
  const contexts: NCLContext[] = []
  for (let i = 0; i < docContexts.length; i++) {
    const importContext = new NCLContext(
      docContexts[i],
      docContexts[i].lineNumber,
      docContexts[i].columnNumber
    )
    if (!importContext.refer) {
      contexts.push(importContext)
    }
  }
  contexts.push(new NCLContext(docBody, docBody.lineNumber, docBody.columnNumber))
  // contexts.push(new NCLContext(docNcl, docNcl.lineNumber, docNcl.columnNumber));

  const docSwitches = domObj.getElementsByTagName('switch')
  const switches: NCLSwitch[] = []
  for (let i = 0; i < docSwitches.length; i++) {
    const importSwitch = new NCLSwitch(docSwitches[i], docSwitches[i].lineNumber, docSwitches[i].columnNumber)
    if (!importSwitch.refer) {
      switches.push(importSwitch)
    }
  }

  importsObj['importedMedias'].push(...medias)
  importsObj['importedContexts'].push(...contexts)
  importsObj['importedSwitches'].push(...switches)
  importsObj['importedEffects'].push(...effects)

  return importsObj
}

export function searchComponents(componentList: any, component: string): boolean {
  for (let i = 0; i < componentList.length; i++) {
    if (componentList[i]['component'].id === component) {
      return true
    }
  }

  return false
}

export function canRoleBeUsed(availableRoles: any, role: string | null, roleCounts: any) {
  const currentRole: any = roleCounts.find((elem: any) => {
    return elem['role'] === role
  })

  const conditionRole: any = availableRoles['simpleConditions'].find((elem: any) => {
    return elem['role'] === role
  })

  const actionRole: any = availableRoles['simpleActions'].find((elem: any) => {
    return elem['role'] === role
  })

  if (
    currentRole &&
    conditionRole &&
    currentRole['count'] <= conditionRole['max'] &&
    currentRole['count'] >= conditionRole['min']
  ) {
    return true
  }

  if (
    currentRole &&
    actionRole &&
    currentRole['count'] <= actionRole['max'] &&
    currentRole['count'] >= actionRole['min']
  ) {
    return true
  }

  return false
}

export function isRoleAvailable(roleList: any, role: string | null): boolean {
  // console.log(role);
  // console.log(roleList);
  for (let i = 0; i < roleList['simpleConditions'].length; i++) {
    if (roleList['simpleConditions'][i]['role'] === role) {
      // roleList['simpleConditions'][i]['inUse'] = true;
      return true
    }
  }

  for (let i = 0; i < roleList['simpleActions'].length; i++) {
    if (roleList['simpleActions'][i]['role'] === role) {
      // roleList['simpleActions'][i]['inUse'] = true;
      return true
    }
  }

  return false
}

export function searchRefers(referList: any, refer: string): boolean {
  for (let i = 0; i < referList.length; i++) {
    if (referList[i]['refer'].id === refer) {
      return true
    }
  }
  // console.log("Not true -->", refer);
  return false
}

export function areMediaChildrenIgnored(referredMedia: NCLMedia, currentMedia: NCLMedia): boolean {
  const currentChildren = currentMedia.childNodes
  for (let i = 0; i < currentChildren.length; i++) {
    const currentChild = currentChildren[i]
    // console.log("filho atual do <media> atual:", currentChild.tagName);
    for (let j = 0; j < referredMedia.childNodes.length; j++) {
      const referredMediaChild = referredMedia.childNodes[j]
      // console.log("filho atual do <media> referenciado:", referredMediaChild.tagName);

      if (
        currentChild.tagName === 'property' &&
        currentChild.tagName === referredMediaChild.tagName &&
        currentChild.name === referredMediaChild.name
      ) {
        return true
      } else if (
        currentChild.tagName === 'area' &&
        currentChild.tagName === referredMediaChild.tagName &&
        currentChild.id === referredMediaChild.id
      ) {
        return true
      }
    }
  }

  return false
}

export function areEffectChildrenIgnored(referredEffect: NCLEffect, currentEffect: NCLEffect): boolean {
  const currentChildren = currentEffect.childNodes
  for (let i = 0; i < currentChildren.length; i++) {
    const currentChild = currentChildren[i]
    // console.log("filho atual do <effect> atual:", currentChild.tagName);
    for (let j = 0; j < referredEffect.childNodes.length; j++) {
      const referredEffectChild = referredEffect.childNodes[j]
      // console.log("filho atual do <media> referenciado:", referredMediaChild.tagName);

      if (
        currentChild.tagName === 'property' &&
        currentChild.tagName === referredEffectChild.tagName &&
        currentChild.name === referredEffectChild.name
      ) {
        return true
      } else if (
        currentChild.tagName === 'area' &&
        currentChild.tagName === referredEffectChild.tagName &&
        currentChild.id === referredEffectChild.id
      ) {
        return true
      }
    }
  }

  return false
}

export function searchInterfaces(refList: any, itrf: string, component: string): boolean {
  // console.log(refList);
  for (let i = 0; i < refList.length; i++) {
    // console.log(refList[i]['component'].tagName);
    switch (refList[i]['component'].tagName) {
      case 'media':
        for (let j = 0; j < refList[i]['interfaces'].length; j++) {
          if (refList[i]['interfaces'][j].tagName === 'property') {
            if (refList[i]['interfaces'][j].name === itrf) {
              return true
            }
          } else {
            if (refList[i]['interfaces'][j].id === itrf && refList[i]['component'].id === component) {
              return true
            }
          }
        }

        break
      default:
        for (let j = 0; j < refList[i]['interfaces'].length; j++) {
          if (refList[i]['interfaces'][j].id === itrf && refList[i]['component'].id === component) {
            return true
          }
        }
    }
  }

  return false
}
