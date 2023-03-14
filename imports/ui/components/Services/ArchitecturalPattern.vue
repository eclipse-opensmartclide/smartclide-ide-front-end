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
    id="architectural-pattern-modal"
    title="Architectural Pattern Assistant"
    hide-footer
  >
    Architectural Pattern Modal
  </b-modal>
</template>

<script>
  export default {
    name: "ArchitecturalPattern",
    mounted(){
      this.fetchAPSSurvey();
    },
    methods: {
      fetchAPSSurvey(){
        Meteor.call("getAPSSurvey", this.$store.state.keycloak.idToken, (error, result) => {
          if(result){
            for(const field of Object.keys(result.fields))
              if(result.fields[field].formType === "radio")
                result.fields[field].value = null;
              else if(result.fields[field].formType === "checkbox")
                result.fields[field].values = [];

            this.steps.splice(this.getStepIndex("Architectural Pattern Selection"), 0, result);
          }
        });
      },
      buildAPSResponsesArray(){
        let responses = [];
        const stepIndex = this.getStepIndex("Architectural Pattern Form");

        for(const field of Object.keys(this.steps[stepIndex].fields)){
          const values = this.steps[stepIndex].fields[field].values;
          values ? responses.push(...values) : responses.push(this.steps[stepIndex].fields[field].value);
        }

        return responses;
      },
      getAPSEvaluation(){
        Meteor.call("evaluateAPSInput", this.$store.state.keycloak.idToken, this.buildAPSResponsesArray(),
            (error, result) => {
              if(result){
                console.log(result);
              }
            }
        );
      },
    }
  }
</script>

<style scoped>
  .about-text{
    font-size: 13px;
  }
</style>
