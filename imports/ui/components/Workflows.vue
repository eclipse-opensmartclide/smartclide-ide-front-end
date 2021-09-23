<template>
  <div>
    Workflows
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Workflows",
  created() {
    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Authorization", "Bearer " + Vue.prototype.$keycloakToken)

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    fetch("https://che-smartclide-che.che.smartclide.eu/api/workspace", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
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
