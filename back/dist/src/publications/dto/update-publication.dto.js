"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePublicationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_publication_dto_1 = require("./create-publication.dto");
class UpdatePublicationDto extends (0, mapped_types_1.PartialType)(create_publication_dto_1.CreatePublicationDto) {
}
exports.UpdatePublicationDto = UpdatePublicationDto;
//# sourceMappingURL=update-publication.dto.js.map