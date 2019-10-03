import { makeEnums } from './Enum'

const enums = {
  State: {
    ACTIVE: { name: '활성화', value: 'ACTIVE' },
    INACTIVE: { name: '비활성화', value: 'INACTIVE' }
  },
  Type: {
    GASOLINE: { name: '가솔린', value: 'GASOLINE' },
    DIESEL: { name: '디젤', value: 'DIESEL' },
  },
}

export default makeEnums(enums)
