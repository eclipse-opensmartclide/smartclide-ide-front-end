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
  <div class="quick_access">
    <div class="d-flex align-items-center">
      <div class="option p-2">
        Quick Access
      </div>

      <!-- dropdown plugins/methods-->
      <nav class="navbar navbar-expand-lg navbar-light navbar_custom mr-1">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <b-icon-plus-circle/>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <!-- plugins -->
              <li class="dropdown-submenu" v-for="plugin in plugins" :value="plugin">
                <a class="dropdown-item" v-bind:class="{'dropdown-toggle':plugin.commands.length}">{{plugin.name}}</a>
                <!-- command -->
                <template v-if="plugin.commands.length">
                  <ul class="dropdown-menu">
                    <li class="dropdown-submenu" v-for="command in plugin.commands">
                      <a class="dropdown-item" @click="add(plugin,command)">{{command.name}}</a>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>

    <!-- commands -->
    <div class="d-flex align-items-center mr-1 " v-for="shortcut in shortcuts" >
      <div class="option p-2" @click="commandClick(shortcut)">
        {{shortcut.plugin+'-'+shortcut.command}}
      </div>
      <b-icon-dash-circle class="ml-3 " @click="remove(shortcut)"/>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        shortcuts: [],
        plugins: [
          {
            name: "Plugin 1",
            commands: [
              {
                name: "Command 1"
              },
              {
                name: "Command 2"
              }
            ]
          },

          {
            name: "Plugin 2",
            commands: [
              {
                name: "Command 1"
              },
              {
                name: "Command 2"
              },
              {
                name: "Command 3"
              }
            ]
          }
        ]
      }
    },
    methods: {
      add(plugin, command) {
        const exists = this.shortcuts.find(el=> el.plugin === plugin.name && el.command === command.name)
        if(!exists){
          this.shortcuts.push({
            plugin: plugin.name,
            command: command.name
          })
        }
      },

      remove(shortcut) {
        const idx = this.shortcuts.indexOf(shortcut)
        if(idx > -1){
          this.shortcuts.splice(idx, 1)
        }
      },

      commandClick(shortcut){

      }
    },

    mounted() {
      $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
          $('.dropdown-submenu .show').removeClass("show");
        });
        return false;
      });
    }
  }
</script>

<style scoped>
  .quick_access{
    display: flex;
    flex-direction: column;
    background: #F1F1F1;
    border-bottom: 1px solid #EDEDED;
  }

  .option{
    flex-grow: 1;
    margin-left: 8px;
  }

  .navbar_custom{
    padding: 0!important;
  }
  .navbar-expand-lg .navbar-nav .nav-link{
    padding: 0!important;
  }

  .dropdown-submenu {
    position: relative;
  }

  .dropdown-submenu a::after {
    transform: rotate(-90deg);
    position: absolute;
    right: 6px;
    top: .8em;
  }

  .dropdown-submenu .dropdown-menu {
    top: 0;
    left: 100%;
    margin-left: .1rem;
    margin-right: .1rem;
  }
</style>
