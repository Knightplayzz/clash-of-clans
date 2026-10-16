import { ValidationError } from "../errors.js";

export function normalizeTag(tag: string, type: "player" | "clan" | "war" | "leagueGroup"): string {
  if (typeof tag !== "string" || tag.trim() === "") {
    throw new ValidationError(`${type}Tag must be a non-empty string.`);
  }
  const normalized = tag.trim().replace(/^#/, "");
  if (!/^[0289PYLQGRJCUV]+$/i.test(normalized)) {
    throw new ValidationError(`${type}Tag contains invalid characters.`);
  }
  return normalized.toUpperCase();
}

export function validateCountryCode(code: string): void {
  if (typeof code !== "string" || !/^(global|[A-Za-z]{2})$/.test(code)) {
    throw new ValidationError('countryCode must be "global" or a 2-letter country code.');
  }
}

export function normalizeCountryCode(code: string): string {
  validateCountryCode(code);
  return code.toLowerCase();
}

export function validateLimit(limit: number | undefined): void {
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1 || limit > 100)) {
    throw new ValidationError("limit must be an integer between 1 and 100.");
  }
}

export function validateLeagueId(leagueId: number): void {
  if (!Number.isInteger(leagueId) || leagueId <= 0) {
    throw new ValidationError("leagueId must be a positive integer.");
  }
}

export function validateLocationId(locationId: number): void {
  if (!Number.isInteger(locationId) || locationId < 0) {
    throw new ValidationError("locationId must be a non-negative integer.");
  }
}

export function validateSeasonId(seasonId: string): void {
  if (typeof seasonId !== "string" || seasonId.trim() === "") {
    throw new ValidationError("seasonId must be a non-empty string.");
  }
}

export function validatePlayerToken(token: string): void {
  if (typeof token !== "string" || token.trim() === "") {
    throw new ValidationError("player token must be a non-empty string.");
  }
}
