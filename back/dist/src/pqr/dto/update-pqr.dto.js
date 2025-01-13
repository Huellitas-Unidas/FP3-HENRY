"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePqrDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pqr_dto_1 = require("./create-pqr.dto");
class UpdatePqrDto extends (0, mapped_types_1.PartialType)(create_pqr_dto_1.CreatePqrDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePqrDto = UpdatePqrDto;
//# sourceMappingURL=update-pqr.dto.js.map