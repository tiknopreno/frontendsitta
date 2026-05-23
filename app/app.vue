<script setup>
import Toast from './components/Toast.vue';
useState('checkoutBook', () => null)
useState('shippingStatus', () => 'Processing')
</script>

<template>
  <NuxtLayout>
    <div>
      <Toast />
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
