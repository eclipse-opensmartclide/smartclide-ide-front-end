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
  <div>
    <smart-widget-grid isStatic :layout.sync="cards" :margin="[25, 25]" autoSize>
      <smart-widget class="title text-primary" v-for="card in cards" :slot="card.i" :title="card.category" :loading="!items[card.category].loaded" :padding="[0,0]">
        <BTable class="custom_table" hover bordered :items="items[card.category].content"/>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
export default {
  name: "Credentials",
  data(){
    return {
      cards: [
        { x: 0, y: 0, w: 12, h: 5, i: 0, category: 'Git'},
        { x: 0, y: 11, w: 12, h: 5, i: 1, category: 'Service Registries'},
        { x: 0, y: 24, w: 12, h: 5, i: 2, category: 'Deployment Platforms'},
        { x: 0, y: 36, w: 12, h: 5, i: 3, category: 'CI Managers'}
      ],
      items: {
        "Git": {
          loaded: false,
          content: [
            { platform: "GitHub", URL: 'https://github.com', username: 'userA', token: "**********" },
            { platform: "GitLab", URL: 'https://about.gitlab.com', username: 'userB', token: "**********" },
            { platform: "Bitbucket", URL: 'https://bitbucket.org', username: 'userC', token: "**********" }
          ]
        },
        "Service Registries": {
          loaded: false,
          content: [
            { type: "GitHub", URL: 'https://github.com', username: 'userD', token: "**********" },
            { type: "GitLab", URL: 'https://about.gitlab.com', username: 'userE', token: "**********" },
            { type: "Bitbucket", URL: 'https://bitbucket.org', username: 'userF', token: "**********" },
            { type: "ProgrammableWeb", URL: 'https://www.programmableweb.com', username: 'userG', token: "**********" },
            { type: "Docker", URL: 'https://www.docker.com/', username: 'userH', token: "**********" }
          ]
        },
        "Deployment Platforms": {
          loaded: false,
          content: [
            { URL: 'https://kubernetes.io', username: 'userI', token: "**********" }
          ],
        },
        "CI Managers": {
          loaded: false,
          content: [
            { type: "Jenkins", URL: 'https://www.jenkins.io', username: 'userJ', token: "**********" },
            { type: "GitLab CI/CD", URL: 'https://about.gitlab.com', username: 'userK', token: "**********" },
            { type: "GitHub Actions", URL: 'https://github.com', username: 'userL', token: "**********" },
            { type: "Travis CI", URL: 'https://www.travis-ci.com/', username: 'userM', token: "**********" }
          ]
        }
      }
    };
  },
  mounted(){
    this.$store.state.context = 'my-account';
  }
}
</script>

<style scoped>
  .title{
    text-transform: capitalize;
  }

  .smartwidget{
    border-radius: 10px;
    height: fit-content;
  }

  /deep/ .widget-header{
    background: #F8FAFB;
    height: 37px!important;
    line-height: 37px!important;
    padding-left: 10px;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  /deep/ .custom_table thead{
    background: #E5EEFD;
    text-align: center;
  }

  /deep/ .custom_table tbody{
    text-transform: none;
  }
</style>
