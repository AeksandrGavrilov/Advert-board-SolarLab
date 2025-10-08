import { DadataApiService } from "../services/api/dadata-api/dadata-api.service";
import { DadataInterface } from "./dadata-interface";

export interface DadataResponseInterface {
    suggestions: DadataInterface[];
}
