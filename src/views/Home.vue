<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<Withdraw @set-status="updateSnackbar" />
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="6">
				<Create @set-status="updateSnackbar" />
			</v-col>
			<v-col cols="12" md="6">
				<MyCodes @set-status="updateSnackbar" />
			</v-col>
		</v-row>
		<v-snackbar v-model="snackbar.display">
			{{ snackbar.text }}
			<v-btn icon @click="snackbar.display = false"><v-icon>mdi-close-circle</v-icon></v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
	import Create from '../components/Create'
	import Withdraw from '../components/Withdraw'
	import MyCodes from '../components/MyCodes'

	export default {
		components: {
			Create,
			Withdraw,
			MyCodes
		},
		data: () => ({
			snackbar: {
				display: false,
				text: ''
			}
		}),
		methods: {
			updateSnackbar: function ({ display, text }) {
				this.snackbar.display = display;
				this.snackbar.text = text;
			}
		}
	};
</script>
