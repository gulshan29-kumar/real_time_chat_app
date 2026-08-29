/**
 * Input validation utilities for QuickChat
 * Author: Gulshan Kumar (IIIT Ranchi)
 */

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

export const validateFullName = (name) => {
  return typeof name === 'string' && name.trim().length >= 2;
};
