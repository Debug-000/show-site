
const systemKeywords = ['ent', 'break' ,'default' ,'func' ,'interface' ,'select' ,'case' ,'defer' ,'go' ,'map' ,'struct' ,'chan' ,'else' ,'goto' ,'package' ,'switch' ,'const' ,'fallthrough' ,'if' ,'range' ,'type' ,'continue' ,'for' ,'import' ,'return' ,'var', 'int', 'string', 'bool', 'float', 'double', 'byte', 'rune', 'uint', 'int8', 'int16', 'int32', 'int64', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr', 'float32', 'float64', 'complex64', 'complex128', 'error', 'nil', 'true', 'false', 'iota', 'append', 'cap', 'close', 'complex', 'copy', 'delete', 'imag', 'len', 'make', 'new', 'panic', 'print', 'println', 'real', 'recover'];
export const ENTITY_CHILDREN_SYSTEM_KEYWORDS = [ ...systemKeywords, 'id', 'created by', 'updated by', 'created at', 'updated at']
export const ENTITY_SYSTEM_KEYWORDS = [ ...systemKeywords]

export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
export const NEXT_PUBLIC_GRAPHQL_PLAYGROUND_URL = process.env.NEXT_PUBLIC_GRAPHQL_PLAYGROUND_URL;
export const CENTRIFUGO_URL = process.env.NEXT_PUBLIC_CENTRIFUGO_URL;