<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Waves</span>
        <span class="font-weight-light">Codes</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/bodrych/waves-codes" target="_blank" icon><v-icon>mdi-github-circle</v-icon></v-btn>
    </v-app-bar>

    <v-content>
      <RouterView />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
}
</script>
