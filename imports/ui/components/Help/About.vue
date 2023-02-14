<!-------------------------------------------------------------------------------
 - Copyright (c) 2021 Unparallel Innovation, Lda
 -
 - This program and the accompanying materials are made available under the
 - terms of the Eclipse Public License 2.0 which is available at
 - http://www.eclipse.org/legal/epl-2.0.
 -
 - SPDX-License-Identifier: EPL-2.0
 -------------------------------------------------------------------------------->

<template>
  <b-modal
    id="about-modal"
    title="About SmartCLIDE IDE"
    hide-footer
  >
    <b-table-simple>
      <b-row>
        <b-col cols="3">
          <b-img src="/assets/SmartCLIDERGBColor.png" fluid/>
        </b-col>
        <b-col class="pl-0" align="justify">
          <div>
            <p>
              <b>SmartCLIDE IDE</b>
            </p>
          </div>
          <div class="about-text">
            <p>
              The SmartCLIDE IDE is a Cloud-based IDE named after and developed under the scope
              of the <a href="https://smartclide.eu" target="_blank">SmartCLIDE</a> research project.
            </p>
          </div>
          <div class="about-text">
            <p>
              The source code was submitted as an open-source platform extending Eclipse Theia, which originated the
              <a href="https://projects.eclipse.org/projects/ecd.opensmartclide" target="_blank">Eclipse OpenSmartCLIDE</a>
              project.
            </p>
          </div>
          <div class="about-text">
            <p>
              Report an issue <a href="https://github.com/eclipse-opensmartclide/smartclide-ide-front-end/issues" target="_blank">here</a>.
            </p>
          </div>
        </b-col>
      </b-row>
      <b-row align-v="center">
        <b-col cols="3">
          <div class="d-flex flex-row align-items-center">
            <b-img src="/assets/EUFlag.png" fluid width="75px" center/>
          </div>
        </b-col>
        <b-col class="about-text pl-0" align="justify">
          SmartCLIDE has received funding from the European Union&apos;s Horizon 2020
          research and innovation programme under grant agreement no. 871177.
        </b-col>
      </b-row>
    </b-table-simple>
  </b-modal>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>
  .about-text{
    font-size: 13px;
  }
</style>
