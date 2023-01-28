<script lang="ts" setup>
const currentUser = useAuthUser();
// https://lk.rosreestr.ru/eservices/real-estate-objects-online
</script>

<template>
	<div>
		<PageTitle title="Home" />
		<PageDescription
			description="Simple authentification example using Nuxt3"
		/>
		<PageUser :user="currentUser" />
	</div>
</template>
