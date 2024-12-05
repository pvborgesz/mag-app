export const connectorsBase = `
        <connectorBase>
            <!-- OnBegin -->
            <causalConnector id="onBeginStart">
                <simpleCondition role="onBegin" />
                <simpleAction role="start" />
            </causalConnector>
            <causalConnector id="onBeginStop">
                <simpleCondition role="onBegin" />
                <simpleAction role="stop" />
            </causalConnector>
            <causalConnector id="onBeginPause">
                <simpleCondition role="onBegin" />
                <simpleAction role="pause" />
            </causalConnector>
            <causalConnector id="onBeginResume">
                <simpleCondition role="onBegin" />
                <simpleAction role="resume" />
            </causalConnector>
            <causalConnector id="onBeginSet">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <simpleAction role="set" value="$var" />
            </causalConnector>
            <!-- OnEnd -->
            <causalConnector id="onEndStart">
                <simpleCondition role="onEnd" />
                <simpleAction role="start" />
            </causalConnector>
            <causalConnector id="onEndStop">
                <simpleCondition role="onEnd" />
                <simpleAction role="stop" />
            </causalConnector>
            <causalConnector id="onEndPause">
                <simpleCondition role="onEnd" />
                <simpleAction role="pause" />
            </causalConnector>
            <causalConnector id="onEndResume">
                <simpleCondition role="onEnd" />
                <simpleAction role="resume" />
            </causalConnector>
            <causalConnector id="onEndSet">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <simpleAction role="set" value="$var" />
            </causalConnector>
            <!-- OnMouseSelection -->
            <causalConnector id="onSelectionStart">
                <simpleCondition role="onSelection" />
                <simpleAction role="start" />
            </causalConnector>
            <causalConnector id="onSelectionStop">
                <simpleCondition role="onSelection" />
                <simpleAction role="stop" />
            </causalConnector>
            <causalConnector id="onSelectionPause">
                <simpleCondition role="onSelection" />
                <simpleAction role="pause" />
            </causalConnector>
            <causalConnector id="onSelectionResume">
                <simpleCondition role="onSelection" />
                <simpleAction role="resume" />
            </causalConnector>
            <causalConnector id="onSelectionSetVar">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <simpleAction role="set" value="$var" />
            </causalConnector>
            <!-- OnKeySelection -->
            <causalConnector id="onKeySelectionStart">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <simpleAction role="start" />
            </causalConnector>
            <causalConnector id="onKeySelectionStop">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <simpleAction role="stop" />
            </causalConnector>
            <causalConnector id="onKeySelectionPause">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <simpleAction role="pause" />
            </causalConnector>
            <causalConnector id="onKeySelectionResume">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <simpleAction role="resume" />
            </causalConnector>
            <causalConnector id="onKeySelectionSetVar">
                <connectorParam name="keyCode" />
                <connectorParam name="var" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <simpleAction role="set" value="$var" />
            </causalConnector>
            <!-- OnBeginAttribution -->
            <causalConnector id="onBeginAttributionStart">
                <simpleCondition role="onBeginAttribution" />
                <simpleAction role="start" />
            </causalConnector>
            <causalConnector id="onBeginAttributionStop">
                <simpleCondition role="onBeginAttribution" />
                <simpleAction role="stop" />
            </causalConnector>
            <causalConnector id="onBeginAttributionPause">
                <simpleCondition role="onBeginAttribution" />
                <simpleAction role="pause" />
            </causalConnector>
            <causalConnector id="onBeginAttributionResume">
                <simpleCondition role="onBeginAttribution" />
                <simpleAction role="resume" />
            </causalConnector>
            <causalConnector id="onBeginAttributionSet">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <simpleAction role="set" value="$var" />
            </causalConnector>
            <!-- OnEndAttribution -->
            <causalConnector id="onEndAttributionStart">
                <simpleCondition role="onEndAttribution" />
                <simpleAction role="start" />
            </causalConnector>
            <causalConnector id="onEndAttributionStop">
                <simpleCondition role="onEndAttribution" />
                <simpleAction role="stop" />
            </causalConnector>
            <causalConnector id="onEndAttributionPause">
                <simpleCondition role="onEndAttribution" />
                <simpleAction role="pause" />
            </causalConnector>
            <causalConnector id="onEndAttributionResume">
                <simpleCondition role="onEndAttribution" />
                <simpleAction role="resume" />
            </causalConnector>
            <causalConnector id="onEndAttributionSet">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <simpleAction role="set" value="$var" />
            </causalConnector>
            <!-- OnBegin multiple actions -->
            <causalConnector id="onBeginStartStop">
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginStartPause">
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginStartResume">
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginStartSet">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginStopStart">
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginStopPause">
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>

            <causalConnector id="onBeginStopResume">
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginStopSet">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginSetStart">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginSetStop">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginSetPause">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginSetResume">
                <connectorParam name="var" />
                <simpleCondition role="onBegin" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <!-- OnEnd multiple actions -->
            <causalConnector id="onEndStartStop">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStartPause">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStartResume">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStartSet">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStopStart">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStopPause">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStopResume">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndStopSet">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndSetStart">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndSetStop">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndSetPause">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndSetResume">
                <connectorParam name="var" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <!-- OnMouseSelection multiple actions -->
            <causalConnector id="onSelectionStartStop">
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionStartPause">
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionStartResume">
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionStartSet">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>

            <causalConnector id="onSelectionStopStart">
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionStopPause">
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionStopResume">
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionStopSet">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionSetStart">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionSetStop">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionSetPause">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onSelectionSetResume">
                <connectorParam name="var" />
                <simpleCondition role="onSelection" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <!-- OnKeySelection multiple actions -->
            <causalConnector id="onKeySelectionStartStop">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStartPause">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStartResume">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStartSet">
                <connectorParam name="var" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStopStart">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStopPause">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStopResume">
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStopSet">
                <connectorParam name="var" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionSetStart">
                <connectorParam name="var" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionSetStop">
                <connectorParam name="var" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionSetPause">
                <connectorParam name="var" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionSetResume">
                <connectorParam name="var" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <!-- OnBeginAttribution multiple actions -->
            <causalConnector id="onBeginAttributionStartStop">
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStartPause">
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStartResume">
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStartSet">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStopStart">
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStopPause">
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStopResume">
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionStopSet">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionSetStart">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionSetStop">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionSetPause">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onBeginAttributionSetResume">
                <connectorParam name="var" />
                <simpleCondition role="onBeginAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <!-- OnEndAttribution multiple actions -->
            <causalConnector id="onEndAttributionStartStop">
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionStartPause">
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionStartResume">
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>

            <causalConnector id="onEndAttributionStartSet">
                <connectorParam name="var" />
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="start" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionStopStart">
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionStopPause">
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionStopResume">
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionStopSet">
                <connectorParam name="var" />
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$var" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionSetStart">
                <connectorParam name="var" />
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionSetStop">
                <connectorParam name="var" />
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="stop" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionSetPause">
                <connectorParam name="var" />
                <simpleCondition role="onEndAttribution" />
                <simpleAction role="set" value="$var" />
                <simpleAction role="pause" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndAttributionSetResume">
                <connectorParam name="var" />
                <simpleCondition role="onEndAttribution" />
                <compoundAction operator="seq">
                    <simpleAction role="set" value="$var" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <!--Miscellaneous-->
            <causalConnector id="onKeySelectionStopResizePauseStart">
                <connectorParam name="width" />
                <connectorParam name="height" />
                <connectorParam name="left" />
                <connectorParam name="top" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="setWidth" value="$width" />
                    <simpleAction role="setHeight" value="$height" />
                    <simpleAction role="setLeft" value="$left" />
                    <simpleAction role="setTop" value="$top" />
                    <simpleAction role="pause" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onEndResizeResume">
                <connectorParam name="left" />
                <connectorParam name="top" />
                <connectorParam name="width" />
                <connectorParam name="height" />
                <simpleCondition role="onEnd" />
                <compoundAction operator="seq">
                    <simpleAction role="setLeft" value="$left" />
                    <simpleAction role="setTop" value="$top" />
                    <simpleAction role="setWidth" value="$width" />
                    <simpleAction role="setHeight" value="$height" />
                    <simpleAction role="resume" />
                </compoundAction>
            </causalConnector>
            <causalConnector id="onKeySelectionStopSetPauseStart">
                <connectorParam name="bounds" />
                <connectorParam name="keyCode" />
                <simpleCondition role="onSelection" key="$keyCode" />
                <compoundAction operator="seq">
                    <simpleAction role="stop" />
                    <simpleAction role="set" value="$bounds" />
                    <simpleAction role="pause" />
                    <simpleAction role="start" />
                </compoundAction>
            </causalConnector>
        </connectorBase>
`
export const connectorsMap = {
  onBeginStart: `<causalConnector id="onBeginStart"><simpleCondition role="onBegin" /><simpleAction role="start" /></causalConnector>`,
  onBeginStop: `<causalConnector id="onBeginStop"><simpleCondition role="onBegin" /><simpleAction role="stop" /></causalConnector>`,
  onBeginPause: `<causalConnector id="onBeginPause"><simpleCondition role="onBegin" /><simpleAction role="pause" /></causalConnector>`,
  onBeginResume: `<causalConnector id="onBeginResume"><simpleCondition role="onBegin" /><simpleAction role="resume" /></causalConnector>`,
  onBeginSet: `<causalConnector id="onBeginSet"><connectorParam name="var" /><simpleCondition role="onBegin" /><simpleAction role="set" value="$var" /></causalConnector>`,
  onEndStart: `<causalConnector id="onEndStart"><simpleCondition role="onEnd" /><simpleAction role="start" /></causalConnector>`,
  onEndStop: `<causalConnector id="onEndStop"><simpleCondition role="onEnd" /><simpleAction role="stop" /></causalConnector>`,
  onEndPause: `<causalConnector id="onEndPause"><simpleCondition role="onEnd" /><simpleAction role="pause" /></causalConnector>`,
  onEndResume: `<causalConnector id="onEndResume"><simpleCondition role="onEnd" /><simpleAction role="resume" /></causalConnector>`,
  onEndSet: `<causalConnector id="onEndSet"><connectorParam name="var" /><simpleCondition role="onEnd" /><simpleAction role="set" value="$var" /></causalConnector>`,
  onSelectionStart: `<causalConnector id="onSelectionStart"><simpleCondition role="onSelection" /><simpleAction role="start" /></causalConnector>`,
  onSelectionStop: `<causalConnector id="onSelectionStop"><simpleCondition role="onSelection" /><simpleAction role="stop" /></causalConnector>`,
  onSelectionPause: `<causalConnector id="onSelectionPause"><simpleCondition role="onSelection" /><simpleAction role="pause" /></causalConnector>`,
  onSelectionResume: `<causalConnector id="onSelectionResume"><simpleCondition role="onSelection" /><simpleAction role="resume" /></causalConnector>`,
  onSelectionSetVar: `<causalConnector id="onSelectionSetVar"><connectorParam name="var" /><simpleCondition role="onSelection" /><simpleAction role="set" value="$var" /></causalConnector>`,
  onKeySelectionStart: `<causalConnector id="onKeySelectionStart"><connectorParam name="keyCode" /><simpleCondition role="onSelection" key="$keyCode" /><simpleAction role="start" /></causalConnector>`,
  onKeySelectionStop: `<causalConnector id="onKeySelectionStop"><connectorParam name="keyCode" /><simpleCondition role="onSelection" key="$keyCode" /><simpleAction role="stop" /></causalConnector>`,
  onKeySelectionPause: `<causalConnector id="onKeySelectionPause"><connectorParam name="keyCode" /><simpleCondition role="onSelection" key="$keyCode" /><simpleAction role="pause" /></causalConnector>`,
  onKeySelectionResume: `<causalConnector id="onKeySelectionResume"><connectorParam name="keyCode" /><simpleCondition role="onSelection" key="$keyCode" /><simpleAction role="resume" /></causalConnector>`,
  onKeySelectionSetVar: `<causalConnector id="onKeySelectionSetVar"><connectorParam name="keyCode" /><connectorParam name="var" /><simpleCondition role="onSelection" key="$keyCode" /><simpleAction role="set" value="$var" /></causalConnector>`
}

export enum ConnectorsEnum {
  onBeginStart = 'onBeginStart',
  onBeginStop = 'onBeginStop',
  onBeginPause = 'onBeginPause',
  onBeginResume = 'onBeginResume',
  onBeginSet = 'onBeginSet',
  onEndStart = 'onEndStart',
  onEndStop = 'onEndStop',
  onEndPause = 'onEndPause',
  onEndResume = 'onEndResume',
  onEndSet = 'onEndSet',
  onSelectionStart = 'onSelectionStart',
  onSelectionStop = 'onSelectionStop',
  onSelectionPause = 'onSelectionPause',
  onSelectionResume = 'onSelectionResume',
  onSelectionSetVar = 'onSelectionSetVar',
  onKeySelectionStart = 'onKeySelectionStart',
  onKeySelectionStop = 'onKeySelectionStop',
  onKeySelectionPause = 'onKeySelectionPause',
  onKeySelectionResume = 'onKeySelectionResume',
  onKeySelectionSetVar = 'onKeySelectionSetVar'
}
