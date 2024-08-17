namespace fabricio.job;

using {cuid} from '@sap/cds/common';


entity Clima : cuid {
    key latitude           : Double;
    key longitude          : Double;
        temperatura        : Double;
        temperatura_minina : Double;
        temperatura_maxima : Double;
        umidade            : Integer;
        pressao            : Integer;
        velocidade_vento   : Integer;
}
