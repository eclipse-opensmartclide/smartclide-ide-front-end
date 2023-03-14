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
    v-if="survey.fields"
    id="architectural-pattern-modal"
    title="Architectural Pattern Assistant"
    size="lg"
    scrollable
    ok-only
    ok-title="Get suggestions"
    @ok="getSuggestionsClicked"
    @hidden="resetModal"
  >
    <b-form>
      <b-form-group
          v-for="field in Object.keys(survey.fields)"
          :label="survey.fields[field].label"
      >
        <b-form-radio-group
            v-if="survey.fields[field].formType === 'radio'"
            v-model="survey.fields[field].value"
            required
            stacked
        >
          <b-form-radio
              v-for="option in survey.fields[field].options"
              :value="option.id"
          >
            {{option.text}}
          </b-form-radio>
        </b-form-radio-group>
        <b-form-checkbox-group
            v-else-if="survey.fields[field].formType === 'checkbox'"
            v-model="survey.fields[field].values"
            :required="survey.fields[field].values.length === 0"
            stacked
        >
          <b-form-checkbox
              v-for="option in survey.fields[field].options"
              :value="option.id"
          >
            {{option.text}}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-form>

    <div v-if="suggestions.length > 0">
      <p>According to your input, the most suitable patterns and corresponding scores are:</p>
      <ol>
        <li
          v-for="suggestion in suggestions"
        >
          {{ `${suggestion.pattern} (${suggestion.score})` }}
        </li>
      </ol>
    </div>
  </b-modal>
</template>

<script>
  export default {
    name: "ArchitecturalPattern",
    data(){
      return {
        survey: {},
        patternsDictionary: {},
        suggestions: []
      }
    },
    mounted(){
      this.fetchSurvey();
      this.fetchArchitecturalPatterns();
    },
    methods: {
      fetchSurvey(){
        Meteor.call("getAPSSurvey", this.$store.state.keycloak.idToken, (error, result) => {
          if(result){
            for(const field of Object.keys(result.fields))
              if(result.fields[field].formType === "radio")
                result.fields[field].value = null;
              else if(result.fields[field].formType === "checkbox")
                result.fields[field].values = [];

            this.survey = result;
          }
        });
      },
      fetchArchitecturalPatterns(){
        Meteor.call("getSupportedPatterns", this.$store.state.keycloak.idToken, (error, result) => {
          if(result){
            result.forEach(pattern => {
              const text = pattern.charAt(0) + pattern.substring(1).toLowerCase().replace("_", "-");
              this.patternsDictionary[pattern] = text;
            });
          }
        });
      },
      resetModal(){
        Object.keys(this.survey.fields).forEach(field => {
          this.survey.fields[field].value ? this.survey.fields[field].value = null : this.survey.fields[field].values = [];
        });
        this.suggestions = [];
      },
      getSuggestionsClicked(bvModalEvent){
        bvModalEvent.preventDefault();

        const responses = this.buildResponsesArray();

        if(responses)
          this.getSuggestions(responses);
      },
      buildResponsesArray(){
        let responses = [];

        for(const field of Object.keys(this.survey.fields))
          if(this.survey.fields[field].formType === "radio")
            if(this.survey.fields[field].value !== null)
              responses.push(this.survey.fields[field].value);
            else
              return false;
          else
            if(this.survey.fields[field].formType === "checkbox")
              if(this.survey.fields[field].values.length !== 0)
                responses.push(...this.survey.fields[field].values);
              else
                return false;

        return responses;
      },
      sortSuggestions(suggestions){
        const sortedArray = Object.entries(suggestions).sort(([,a],[,b]) => b-a);
        let translatedArray = [];

        sortedArray.forEach(suggestion => {
          translatedArray.push({
            pattern: this.patternsDictionary[suggestion[0]],
            score: suggestion[1]
          });
        });

        return translatedArray;
      },
      getSuggestions(responses){
        Meteor.call("evaluateAPSInput", this.$store.state.keycloak.idToken, responses,
            (error, result) => {
              if(result){
                this.suggestions = this.sortSuggestions(result);
              }
            }
        );
      }
    }
  }
</script>

<style scoped>

</style>
