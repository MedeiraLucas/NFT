import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from '@tanstack/react-router';
import {QueryClientProvider} from '@tanstack/react-query';
import {router} from './app/router';
import {queryClient} from './lib/query/client';
import './style.css';
import './style-cart.css';
import './style-nyxa-inspired.css';

async function start(){if(import.meta.env.VITE_ENABLE_MOCKS!=='false'){const {worker}=await import('./mocks/browser');await worker.start({onUnhandledRequest:'bypass'})}if(import.meta.env.VITE_ENABLE_MOCKS!=='false'){void import('./lib/realtime/socket').then(({startRealtime})=>startRealtime())}createRoot(document.getElementById('root')!).render(<React.StrictMode><QueryClientProvider client={queryClient}><RouterProvider router={router}/></QueryClientProvider></React.StrictMode>)}
start().catch(e=>{console.error('Falha ao iniciar mocks',e);document.getElementById('root')!.textContent='Falha ao iniciar o ambiente de demonstração.'});
