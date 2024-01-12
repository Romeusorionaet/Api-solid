export class ResourceNotFound extends Error {
  constructor() {
    super("Profile credentials not found.");
  }
}
