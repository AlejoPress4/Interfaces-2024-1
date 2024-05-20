export type Inscripcion = {
    estudiante: {
        identificacion: string;
        codigo: string;
        nombre: string;
        semestre: number;
    };
    grupo: {
        codigo: string;
        anio: number;
        periodo: number;
        cupo: number;
        horario: string;
        semanas: number;
        horasSemana: number;
        asignatura: {
            codigo: string;
            nombre: string;
            cuantitativa: boolean;
            horas: number;
        };
        profesor: {
            identificacion: string;
            nombre: string;
            correo: string;
        };
    };
    notas: number[];
    definitiva: number;
    inasistencia: number;
};
export type Estudiante = {
    estudiante: {
        identificacion: string;
        codigo: string;
        nombre: string;
        semestre: number;
    };
    grupo: {
        codigo: string;
        anio: number;
        periodo: number;
        cupo: number;
        horario: string;
        semanas: number;
        horasSemana: number;
        asignatura: {
            codigo: string;
            nombre: string;
            cuantitativa: boolean;
            horas: number;
        };
        profesor: {
            identificacion: string;
            nombre: string;
            correo: string;
        };
    };
    notas: number[];
    definitiva: number;
    inasistencia: number;
};

export type Asignatura = {
    estudiante: {
        identificacion: string;
        codigo: string;
        nombre: string;
        semestre: number;
    };
    grupo: {
        codigo: string;
        anio: number;
        periodo: number;
        cupo: number;
        horario: string;
        semanas: number;
        horasSemana: number;
        asignatura: {
            codigo: string;
            nombre: string;
            cuantitativa: boolean;
            horas: number;
        };
        profesor: {
            identificacion: string;
            nombre: string;
            correo: string;
        };
    };
    notas: number[];
    definitiva: number;
    inasistencia: number;
};

export type Profesor = {
    estudiante: {
        identificacion: string;
        codigo: string;
        nombre: string;
        semestre: number;
    };
    grupo: {
        codigo: string;
        anio: number;
        periodo: number;
        cupo: number;
        horario: string;
        semanas: number;
        horasSemana: number;
        asignatura: {
            codigo: string;
            nombre: string;
            cuantitativa: boolean;
            horas: number;
        };
        profesor: {
            identificacion: string;
            nombre: string;
            correo: string;
        };
    };
    notas: number[];
    definitiva: number;
    inasistencia: number;
};

export type Grupo = {
    estudiante: {
        identificacion: string;
        codigo: string;
        nombre: string;
        semestre: number;
    };
    grupo: {
        codigo: string;
        anio: number;
        periodo: number;
        cupo: number;
        horario: string;
        semanas: number;
        horasSemana: number;
        asignatura: {
            codigo: string;
            nombre: string;
            cuantitativa: boolean;
            horas: number;
        };
        profesor: {
            identificacion: string;
            nombre: string;
            correo: string;
        };
    };
    notas: number[];
    definitiva: number;
    inasistencia: number;
    asignatura: Asignatura;
    profesor: Profesor;
};

export type InfoInscripcion = {
    grupo: Grupo;
    notas: number[];
    definitiva: number;
    inasistencia: number;
};


// la información de un estudiante consta de sus datos personales, un array de sus
// inscripciones (InfoInscripcion[]), su promedio y su rendimiento
export type InfoEstudiante = {
    estudiante: Estudiante; 
    info: InfoInscripcion[];
    promedio?: number; // el promedio de las definitivas
    rendimiento?: string; // deficiente < 3, regular < 3.4, aceptable < 3.9, bueno < 4.4, sobresaliente
};