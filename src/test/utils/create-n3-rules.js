import {test, describe, it} from 'node:test' ;
import assert from "node:assert";

import {
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
} from "./variables.js";

import {
    iterate,
    quad_to_rule,
    range_should_be_defined,
    symmetry_rule,
    transitivity_rule,
    inverseOf_rule,
    subproperty_rule,
    subclass_rule,
    range_rule,
    domain_rule
} from '../../utils/create-n3-rules.js';


describe("Test rule generation", () => {
   /*test("SymmetricProperty", () => {
        iterate(["http://www.w3.org/ns/adms", "http://www.w3.org/2004/02/skos/core", "http://www.w3.org/2000/01/rdf-schema"], {})
    });*/
    test("SymmetricProperty", () => {
        assert(symmetry_rule(object_value_SymmetricProperty) === "{ ?x <http://www.w3.org/2004/02/skos/core#related> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#related> ?x  } .")
    });
    test("SymmetricProperty id", () => {
        assert(symmetry_rule(object_value_SymmetricProperty_id) === "{ ?x <http://www.w3.org/2004/02/skos/core#related> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#related> ?x  } .")
    });
    test("TransitiveProperty", () => {
        assert(transitivity_rule(object_value_TransitiveProperty) === "{ ?x <http://www.w3.org/2004/02/skos/core#broaderTransitive> ?y .  ?y <http://www.w3.org/2004/02/skos/core#broaderTransitive> ?z  } => { ?x <http://www.w3.org/2004/02/skos/core#broaderTransitive> ?z  } .")
    });
    test("inverseOf", () => {
        assert(inverseOf_rule(predicate_value_inverseOf) === "{ ?x <http://www.w3.org/2004/02/skos/core#hasTopConcept> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#topConceptOf> ?x  } .\n" +
            "{ ?x <http://www.w3.org/2004/02/skos/core#topConceptOf> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#hasTopConcept> ?x  } .")
    });
    test("subPropertyOf", () => {
        assert(subproperty_rule(predicate_value_subPropertyOf) === "{ ?x <http://www.w3.org/2004/02/skos/core#topConceptOf> ?y } => { ?x <http://www.w3.org/2004/02/skos/core#inScheme> ?y  } .")
    });
    test("subClassOf", () => {
        assert(subclass_rule(predicate_value_subClassOf) === "{ ?x a <http://www.w3.org/2004/02/skos/core#OrderedCollection> } => { ?x a <http://www.w3.org/2004/02/skos/core#Collection> } .")
    });
    test("domain", () => {
        assert(domain_rule(predicate_value_domain) === "{ ?x <http://www.w3.org/2004/02/skos/core#hasTopConcept> ?y } => { ?x a <http://www.w3.org/2004/02/skos/core#ConceptScheme> } .")
    });
    test("range", () => {
        assert(range_rule(predicate_value_range) === "{ ?x <http://www.w3.org/2004/02/skos/core#inScheme> ?y } => { ?y a <http://www.w3.org/2004/02/skos/core#ConceptScheme> } .")
    });
    test("should a blanknode as range be defined in a rule", () => {
        assert.strictEqual(range_should_be_defined(predicate_value_range_blanknode_id), false)
        assert.strictEqual(range_should_be_defined(predicate_value_range_blanknode), false)
        assert.strictEqual(range_should_be_defined(predicate_value_range), true)
    });
    test("should a Literal as range be defined in a rule", () => {
        assert.strictEqual(range_should_be_defined(range_literal), false)
    });

    test("skos:inScheme rdfs:range skos:ConceptScheme", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_range, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === '{ ?x <http://www.w3.org/2004/02/skos/core#inScheme> ?y } => { ?y a <http://www.w3.org/2004/02/skos/core#ConceptScheme> } .')
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:member rdfs:domain skos:Collection", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_domain_member, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === '{ ?x <http://www.w3.org/2004/02/skos/core#member> ?y } => { ?x a <http://www.w3.org/2004/02/skos/core#Collection> } .')
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:hasTopConcept rdfs:domain skos:ConceptScheme", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_domain, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === '{ ?x <http://www.w3.org/2004/02/skos/core#hasTopConcept> ?y } => { ?x a <http://www.w3.org/2004/02/skos/core#ConceptScheme> } .')
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:OrderedCollection rdfs:subClassOf skos:Collection", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_subClassOf, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === "{ ?x a <http://www.w3.org/2004/02/skos/core#OrderedCollection> } => { ?x a <http://www.w3.org/2004/02/skos/core#Collection> } .")
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:topConceptOf rdfs:subPropertyOf skos:inScheme", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_subPropertyOf, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === "{ ?x <http://www.w3.org/2004/02/skos/core#topConceptOf> ?y } => { ?x <http://www.w3.org/2004/02/skos/core#inScheme> ?y  } .")
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:hasTopConcept owl:inverseOf skos:topConceptOf", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_inverseOf, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === "{ ?x <http://www.w3.org/2004/02/skos/core#hasTopConcept> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#topConceptOf> ?x  } .\n" +
            "{ ?x <http://www.w3.org/2004/02/skos/core#topConceptOf> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#hasTopConcept> ?x  } .")
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:broaderTransitive a owl:TransitiveProperty\n" +
        "the object of this statement belongs to a third ontology and is thus added to the objects array to be dereferenced in the next round", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(object_value_TransitiveProperty, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === "{ ?x <http://www.w3.org/2004/02/skos/core#broaderTransitive> ?y .  ?y <http://www.w3.org/2004/02/skos/core#broaderTransitive> ?z  } => { ?x <http://www.w3.org/2004/02/skos/core#broaderTransitive> ?z  } .")
        assert.strictEqual(result.objects.length, 1)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:related a owl:SymmetricProperty\n" +
        "the object of this statement belongs to a third ontology and is thus added to the objects array to be dereferenced in the next round", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(object_value_SymmetricProperty, objects, rule_array, regexp_uri)
        assert(result.rule_array[0] === "{ ?x <http://www.w3.org/2004/02/skos/core#related> ?y } => { ?y <http://www.w3.org/2004/02/skos/core#related> ?x  } .")
        assert.strictEqual(result.objects.length, 1)
        assert.strictEqual(result.rule_array.length, 1)
    });

    test("skos:member rdfs:range <df_0_1>\n" +
        "the object of this statement is a blank node\n" +
        "the range should not be defined", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/2004/02/skos/core")
        const result = quad_to_rule(predicate_value_range_blanknode, objects, rule_array, regexp_uri)
        assert.strictEqual(range_should_be_defined(predicate_value_range_blanknode), false)
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 0)
    });

    test("adms:schemeAgency rdfs:range rdfs:Literal\n" +
        "the object of this statement is a Literal\n" +
        "the range should not be defined", () => {
        var objects = [];
        var rule_array = [];
        var regexp_uri = new RegExp("http://www.w3.org/ns/adms")
        const result = quad_to_rule(range_literal, objects, rule_array, regexp_uri)
        assert.strictEqual(range_should_be_defined(range_literal), false)
        assert.strictEqual(result.objects.length, 0)
        assert.strictEqual(result.rule_array.length, 0)
    });

});

