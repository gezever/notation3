'use strict';


const predicate_value_subClassOf = {
        "termType": "Quad",
        "value": "predicate_value_subClassOf",
        "subject": {
            "termType": "NamedNode",
            "value": "http://www.w3.org/2004/02/skos/core#OrderedCollection"
        },
        "predicate": {
            "termType": "NamedNode",
            "value": "http://www.w3.org/2000/01/rdf-schema#subClassOf"
        },
        "object": {
            "termType": "NamedNode",
            "value": "http://www.w3.org/2004/02/skos/core#Collection"
        },
        "graph": {
            "termType": "DefaultGraph",
            "value": ""
        }
    }

const predicate_value_range_blanknode = {
    "termType": "Quad",
    "value": "predicate_value_range_blanknode",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#member"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#range"
    },
    "object": {
        "termType": "BlankNode",
        "value": "df_0_1"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}
const predicate_value_range_blanknode_id = {
    "termType": "Quad",
    "id": "predicate_value_range_blanknode",
    "subject": {
        "termType": "NamedNode",
        "id": "http://www.w3.org/2004/02/skos/core#member"
    },
    "predicate": {
        "termType": "NamedNode",
        "id": "http://www.w3.org/2000/01/rdf-schema#range"
    },
    "object": {
        "termType": "BlankNode",
        "id": "df_0_1"
    },
    "graph": {
        "termType": "DefaultGraph",
        "id": ""
    }
}

const predicate_value_domain_member = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#member"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#domain"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#Collection"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

const predicate_value_range = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#inScheme"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#range"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#ConceptScheme"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

const predicate_value_domain = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#hasTopConcept"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#domain"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#ConceptScheme"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

const predicate_value_inverseOf = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#hasTopConcept"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2002/07/owl#inverseOf"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#topConceptOf"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

const predicate_value_subPropertyOf = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#topConceptOf"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#subPropertyOf"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#inScheme"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

const object_value_SymmetricProperty = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#related"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2002/07/owl#SymmetricProperty"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

const object_value_SymmetricProperty_id = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "id": "http://www.w3.org/2004/02/skos/core#related"
    },
    "predicate": {
        "termType": "NamedNode",
        "id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
    },
    "object": {
        "termType": "NamedNode",
        "id": "http://www.w3.org/2002/07/owl#SymmetricProperty"
    },
    "graph": {
        "termType": "DefaultGraph",
        "id": ""
    }
}

const object_value_TransitiveProperty  = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2004/02/skos/core#broaderTransitive"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2002/07/owl#TransitiveProperty"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}
const range_literal = {
    "termType": "Quad",
    "value": "",
    "subject": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/ns/adms#schemeAgency"
    },
    "predicate": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#range"
    },
    "object": {
        "termType": "NamedNode",
        "value": "http://www.w3.org/2000/01/rdf-schema#Literal"
    },
    "graph": {
        "termType": "DefaultGraph",
        "value": ""
    }
}

export {
    predicate_value_domain_member,
    predicate_value_subClassOf,
    predicate_value_range_blanknode,
    predicate_value_range,
    predicate_value_domain,
    predicate_value_inverseOf,
    predicate_value_subPropertyOf,
    object_value_SymmetricProperty,
    object_value_TransitiveProperty,
    predicate_value_range_blanknode_id,
    object_value_SymmetricProperty_id,
    range_literal
}





