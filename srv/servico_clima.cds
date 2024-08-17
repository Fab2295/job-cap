using {fabricio.job as db} from '../db/schema';

define service ClimaJOB {
    @readonly
    entity ConsultarClima as projection on db.Clima;
}
