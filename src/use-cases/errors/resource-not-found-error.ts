export class ResourceNotFoundError extends Error {
  constructor() {
    super("Profile credentials not found.");
  }
}
