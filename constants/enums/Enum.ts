export default class Enum {
  [index: string]: any;

  constructor(obj: object) {
    if (obj) this.init(obj)
  }

  /**
   * enum 초기화 함수.
   * @param obj
   */
  init(obj: object): void {
    const dictTypes: [string, string] = ['string', 'object'];

    Object.entries(obj).forEach(([enumAlias, dict]) => {
      const dictType = typeof dict

      if (!dictTypes.includes(dictType))
        throw new Error(`Enum.init() : Valid dict types are ${dictTypes.join('or')}. : ${dictType}`)

      if (dictType === 'string') {
        this[enumAlias] = { name: dict, value: enumAlias }
      } else {
        this[enumAlias] = dict
      }
    })

    Object.freeze(this)
  }

  /**
   * enumAlias 제거된 array 반환
   * @example [ { name: '마케팅', value: '1' }, { name: '마케팅(비광고)', value: '3' }, { name: '공지', value: '0' }, { name: '댓글알림', value: '2' } ]
   */
  toArray(): Array<{name: string, value: string}> {
    return Object.values(this)
  }

  /**
   * enumAlias array 반환
   * @example [ 'MARKETING', 'MARKETING_NO', 'NOTICE', 'COMMENT' ]
   */
  getEnums(): Array<string> {
    return Object.keys(this)
  }

  /**
   * enumAlias array의 첫번째 반환
   * @example [ 'MARKETING', 'MARKETING_NO', 'NOTICE', 'COMMENT' ]
   */
  first(): string {
    return this.getEnums()[0]
  }

  /**
   * 설정된 name array 반환
   * @example [ '마케팅', '마케팅(비광고)', '공지', '댓글알림' ]
   */
  getNames(): Array<string> {
    return this.getEnums().map(enumAlias => this[enumAlias].name)
  }

  /**
   * 설정된 value array 반환
   * @returns {string[]}
   * @example [ '1', '3', '0', '2' ]
   */
  getValues(): Array<string> {
    return this.getEnums().map(enumAlias => this[enumAlias].value)
  }

  /**
   * value 에 해당하는 name 반환
   * @param   value
   * @example 마케팅
   */
  nameOf(value: string): string {
    const enumAliases = this.getEnums().filter(
      enumAlias => this[enumAlias].value === value
    )
    if (enumAliases.length < 1) {
      throw new Error(`Enum.nameOf() : Not exist enum value! : ${value}`)
    }

    return this[enumAliases[0]].name
  }

  /**
   * name 에 해당하는 value 반환
   * @param name
   * @example 1
   */
  valueOf(name: string): string {
    const enumAliases = this.getEnums().filter(
      enumAlias => this[enumAlias].name === name
    )
    if (enumAliases.length < 1) {
      throw new Error(`Enum.valueOf() : Not exist enum name! : ${name}`)
    }

    return this[enumAliases[0]].value
  }

  /**
   * key 에 해당하는 값을 기준으로 object 생성하여 반환
   * @param   key
   * @example { MARKETING: '마케팅', MARKETING_NO: '마케팅(비광고)', NOTICE: '공지', COMMENT: '댓글알림' }
   */
  convertBy(key: string): IEnums {
    const dictKeys: [string, string] = ['name', 'value'];
    if (!dictKeys.includes(key)) {
      throw new Error(`Enum.convertOf() : Invalid key! Valid keys are ${dictKeys.join('or')} : ${key}`)
    }

    const obj: IEnums = {}

    Object.entries(this).forEach(([enumAlias, data]) => {
      obj[enumAlias] = data[key]
    })

    return obj
  }

  /**
   * enumAlias 유효성 체크
   * @param   enumAlias
   */
  isValidEnum(enumAlias: string): boolean {
    return enumAlias in this
  }

  /**
   * name 유효성 체크
   * @param   name
   */
  isValidName(name: string): boolean {
    return this.getNames().includes(name)
  }

  /**
   * value 유효성 체크
   * @param   value
   */
  isValidValue(value: string): boolean {
    return this.getValues().includes(value)
  }
}

/**
 * 모델 단위로 enum 생성을 위한 메소드
 * @param obj
 */
export const makeEnums = (obj: object = {}): IEnums => {
  const enums: IEnums = {}

  Object.entries(obj).forEach(([column, data]) => {
    enums[column] = new Enum(data)
  })

  return enums
}

export interface IEnums {
  [index: string]: Enum
}
