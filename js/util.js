export const MaxMinConstraint = (value, max, min) =>
  Math.min(Math.max(value, min), max);
