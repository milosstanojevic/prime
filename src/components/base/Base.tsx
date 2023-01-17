import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComponentsPage from './components/ComponentsPage';
import { WarehousesPage } from '../../features/warehouses';
import { MerchantOrdersPage, MerchantPage, MerchantsPage } from '../../features/merchants';
import { ArticlesPage } from '../../features/articles';
import { TransportOrderPage, TransportOrdersPage } from '../../features/transport_orders';
import { UsersPage } from '../../features/users';
import { TransportOrderItemPage, TransportsPage } from '../../features/transports';
import { isInDevelopmentMode } from './utils';
import { WarehouseArticlesPage } from '../../features/warehouse_articles';
import { WarehouseMembers } from '../../features/warehouse_members';
import { WarehouseTransports } from '../../features/warehouse_transports';
import { TransportPage, TransportAddOrdersPage } from '../../features/transports';
import { MerchantArticlesPage } from '../../features/merchant_articles';
import { Login } from '../../features/auth';
import { ProtectedRoute } from './ProtectedRoute';

export const Base: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="warehouse/:id/articles"
                    element={
                        <ProtectedRoute>
                            <WarehouseArticlesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="warehouse/:id/members"
                    element={
                        <ProtectedRoute>
                            <WarehouseMembers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="warehouse/:id/transports"
                    element={
                        <ProtectedRoute>
                            <WarehouseTransports />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="merchants"
                    element={
                        <ProtectedRoute>
                            <MerchantsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="merchants/:id"
                    element={
                        <ProtectedRoute>
                            <MerchantPage />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="articles"
                        element={
                            <ProtectedRoute>
                                <MerchantArticlesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <ProtectedRoute>
                                <MerchantOrdersPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route
                    path="articles"
                    element={
                        <ProtectedRoute>
                            <ArticlesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="users"
                    element={
                        <ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="transport-routes"
                    element={
                        <ProtectedRoute>
                            <TransportsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="transport-routes/:transportId"
                    element={
                        <ProtectedRoute>
                            <TransportPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="transport-routes/:transportId/orders"
                    element={
                        <ProtectedRoute>
                            <TransportAddOrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="transport-routes/:transportId/orders/:orderId"
                    element={
                        <ProtectedRoute>
                            <TransportOrderItemPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute>
                            <TransportOrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="orders/:id"
                    element={
                        <ProtectedRoute>
                            <TransportOrderPage />
                        </ProtectedRoute>
                    }
                />
                {isInDevelopmentMode ? (
                    <Route path="components" element={<ComponentsPage />} />
                ) : null}
                <Route
                    path="*"
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
                <Route
                    path="/warehouses"
                    element={
                        <ProtectedRoute>
                            <WarehousesPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};
