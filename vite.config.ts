import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    hmr: process.env.DISABLE_HMR !== 'true',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'pages/about.html'),
        contact: path.resolve(__dirname, 'pages/contact.html'),
        ohm: path.resolve(__dirname, 'calculators/ohm.html'),
        wire: path.resolve(__dirname, 'calculators/wire.html'),
        voltage_drop: path.resolve(__dirname, 'calculators/voltage-drop.html'),
        power: path.resolve(__dirname, 'calculators/power.html'),
        cost: path.resolve(__dirname, 'calculators/cost.html'),
        resistor_color: path.resolve(__dirname, 'calculators/resistor-color.html'),
        motor: path.resolve(__dirname, 'calculators/motor.html'),
        solar: path.resolve(__dirname, 'calculators/solar.html'),
        breaker: path.resolve(__dirname, 'calculators/breaker.html'),
        pfc: path.resolve(__dirname, 'calculators/pfc.html'),
        series_parallel: path.resolve(__dirname, 'calculators/series-parallel.html'),
        motor_start: path.resolve(__dirname, 'calculators/motor-start.html'),
      },
    },
  },
});
