export class UserNotFoundException extends Error {
  constructor(id: number) {
    super(`사용자 ID ${id}를 찾을 수 없습니다.`);
    this.name = 'UserNotFoundException';
  }
}
