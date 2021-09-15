<template>
  <div>
    WORKFLOWS
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  name: "Workflows",
  created() {
    axios
        .get(`https://che-smartclide-che.che.smartclide.eu/api/workspace`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${Vue.prototype.$keycloakToken}`,
          },
        })
        .then((response) => {
          console.log("response", response.data)
          // setWorkspaces(response.data);
        })
        .catch(() => {
          // setError(true);
          // setWorkspaces(undefined);
          console.log("error")
        })
        .finally(() =>
          // setFetching(false)
          console.log("finally")
        );

  }
}
</script>
