interface StoredData {
  [key: string]: any; // storedData 객체가 키-값 쌍을 가진 객체일 경우
}

// 객체를 localStorage에 저장하고, 기존 키값을 수정하는 함수
export function updateLocalStorageObject<T>(key: string, updateKey: string, updateValue: T): void {
  // 1. localStorage에서 기존 객체 가져오기
  const storedData = localStorage.getItem(key);

  // 2. 객체가 존재하면 JSON.parse()로 객체로 변환
  let object: Record<string, any> = storedData ? JSON.parse(storedData) : {};

  // 3. 객체의 키값을 수정
  object[updateKey] = updateValue;

  // 4. 수정된 객체를 다시 localStorage에 저장
  localStorage.setItem(key, JSON.stringify(object));
}

// localStorage에서 객체를 가져오는 함수
export function getLocalStorageObject<T>(key: string): StoredData | null {
  const storedData = localStorage.getItem(key);

  // 데이터가 없으면 null을 반환
  if (!storedData) {
    return null;
  }

  // 데이터를 JSON으로 파싱하여 반환
  return JSON.parse(storedData);
}

// 배열 안에 있는 특정 객체를 수정하는 함수
function updateLocalStorageArray<T extends { id: number }>(
  key: string,
  id: number,
  updateKey: keyof T, // updateKey는 T 타입의 키 중 하나
  updateValue: T[typeof updateKey] // updateValue는 updateKey에 해당하는 값
): void {
  // 1. localStorage에서 배열 가져오기
  const storedArray = localStorage.getItem(key);

  // 2. 배열이 존재하면 JSON.parse()로 배열로 변환
  let array: T[] = storedArray ? JSON.parse(storedArray) : [];

  // 3. 배열 안에서 수정할 객체 찾기 (예시: id가 주어진 객체 찾기)
  const objectToUpdate = array.find((item) => item.id === id);
  if (objectToUpdate) {
    // 4. 수정할 키값을 수정
    objectToUpdate[updateKey] = updateValue;
  }

  // 5. 수정된 배열을 다시 localStorage에 저장
  localStorage.setItem(key, JSON.stringify(array));
}
