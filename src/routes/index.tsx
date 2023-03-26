import './App.scss'
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { AuthProvider } from "../context/context";
import { StorageContext } from "../context/contextStorage";
import { BiMenu } from 'react-icons/bi';

import { Header } from '../components/Header/Header';
import { Cadastro } from "../pages/Cadastro/Cadastro";
import { Login } from "../pages/Login/Login";
import { Layout } from "../components/Layout/Layout";
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';

import { routes } from './routes'

// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export const AppRoutes = () => {

  const { collapseSidebar, collapsed } = useProSidebar();
  const { isLoggedStorage } = useContext(StorageContext)

  const role = localStorage.getItem("role") ;
  const routesFiltered = role === 'admin' ? routes.adminRoutes : routes.alunoRoutes

  function handleSideBar() {
    collapseSidebar()
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-routes">
          {isLoggedStorage
            ?
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <Sidebar
                  backgroundColor='#fff'
                  rootStyles={{
                    color: '#000',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    {collapsed ?
                      <button style={{ background: 'none', border: 'none' }} onClick={() => handleSideBar()}><BiMenu color='black' size={24} /></button>
                      :
                      <button style={{ background: 'none', border: 'none' }} onClick={() => handleSideBar()}><BiMenu color='black' size={24} /></button>
                    }
                  </div>
                  <Menu>
                    {routesFiltered.map(route => {
                      return <MenuItem key={route.name} icon={<route.icon />} component={<Link to={route.path} />}> {route.name}</MenuItem>
                    })}
                  </Menu>
                </Sidebar>
                {/* <main >
                  {collapsed ?
                    <button style={{ background: 'none', border: 'none' }} onClick={() => handleSideBar()}><BiMenu color='white' size={24} /></button>
                    :
                    <button style={{ background: 'none', border: 'none' }} onClick={() => handleSideBar()}><BiMenu color='white' size={24} /></button>
                  }
                </main> */}

              </div>
              <div className="container" >
                <div className="header">
                  <Header />
                </div>
                <div className="content">
                  <Routes>
                    {routesFiltered.map(route => {
                      return <Route
                        key={route.name}
                        path={route.path}
                        element={
                          <PrivateRoute redirectTo="/">
                            <route.element />
                          </PrivateRoute>
                        }
                      />
                    })}
                  
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </div>
                <div className="footer">
                  <h4>Desenvolvido por Pedro Junior</h4>
                </div>
              </div>
            </div>
            :
            <Layout>
              <div className="content" >
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="*" element={
                    <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center " }}>
                      <span>NOT FOUND</span>
                      <Link to='/' >RETORNAR</Link>
                    </div>
                  } />
                </Routes>
              </div>
            </Layout>
          }
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
