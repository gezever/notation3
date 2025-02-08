import { rdfDereferencer } from "rdf-dereference" ;
import N3 from 'n3';
import path from "path";
import {RoxiReasoner} from "roxi-js";
import fs from 'fs';



var regexp_ns = new RegExp('.*/ns/.*')
const regexp_langString = new RegExp('.*langString.*')
const regexp_XMLSchema = new RegExp('.*XMLSchema.*')
const regexp_Class = new RegExp('.*#Class.*')
const regexp_Literal = new RegExp('.*Literal.*')
const reasoner = RoxiReasoner.new();

const all_rules = 'n3/all-rules.n3'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function domain_rule(quad){
    //return '{ ?x <' + property + '> ?y } => { ?x a <' + klasse + '> } .'
    if (quad.subject.id && quad.object.id){
        return '{ ?x <' + quad.subject.id + '> ?y } => { ?x a <' + quad.object.id + '> } .'
    }
    else if (quad.subject.value && quad.object.value){
        return '{ ?x <' + quad.subject.value + '> ?y } => { ?x a <' + quad.object.value + '> } .'
    }
}

function range_rule(quad){
    //return '{ ?x <' + property + '> ?y } => { ?y a <' + klasse + '> } .'
    if (quad.subject.id && quad.object.id){
        return '{ ?x <' + quad.subject.id + '> ?y } => { ?y a <' + quad.object.id + '> } .'
    }
    else if (quad.subject.value && quad.object.value){
        return '{ ?x <' + quad.subject.value + '> ?y } => { ?y a <' + quad.object.value + '> } .'
    }
}

function subclass_rule(quad){
    if (quad.subject.id && quad.object.id){
        return '{ ?x a <' + quad.subject.id + '> } => { ?x a <' + quad.object.id + '> } .'
    }
    else if (quad.subject.value && quad.object.value){
        return '{ ?x a <' + quad.subject.value + '> } => { ?x a <' + quad.object.value + '> } .'
    }
}

function subproperty_rule(quad){
    if (quad.subject.id && quad.object.id){
        return '{ ?x <' + quad.subject.id + '> ?y } => { ?x <' + quad.object.id + '> ?y  } .'
    }
    else if (quad.subject.value && quad.object.value){
        return '{ ?x <' + quad.subject.value + '> ?y } => { ?x <' + quad.object.value + '> ?y  } .'
    }
}

function inverseOf_rule(quad){
    if (quad.subject.id && quad.object.id){
        return '{ ?x <' + quad.subject.id + '> ?y } => { ?y <' + quad.object.id + '> ?x  } .\n{ ?x <' + quad.object.id + '> ?y } => { ?y <' + quad.subject.id + '> ?x  } .'
    }
    else if (quad.subject.value && quad.object.value){
        return '{ ?x <' + quad.subject.value + '> ?y } => { ?y <' + quad.object.value + '> ?x  } .\n{ ?x <' + quad.object.value + '> ?y } => { ?y <' + quad.subject.value + '> ?x  } .'
    }
}

function transitivity_rule(quad){
    let property = null
    if (quad.subject.value) {
        property = quad.subject.value
    }
    else  {
        property = quad.subject.id
    }
    return '{ ?x <' + property + '> ?y .  ?y <' + property + '> ?z  } => { ?x <' + property + '> ?z  } .'
}


function symmetry_rule(quad){
    let property = null
    if (quad.subject.value ) {
        property = quad.subject.value
    }
    else if (quad.subject.id ) {
        property = quad.subject.id
    }
    return '{ ?x <' + property + '> ?y } => { ?y <' + property + '> ?x  } .'
}

// In case of a blanknode or a literal, no rule should be generated.
function range_should_be_defined(quad){
    if (quad.object.value) {
        return quad.object.termType !== 'BlankNode' && !regexp_langString.test(quad.object.value) && !regexp_XMLSchema.test(quad.object.value) && !regexp_Literal.test(quad.object.value)
    }
    else if (quad.object.id)  {
        return quad.object.termType !== 'BlankNode' && !regexp_langString.test(quad.object.id) && !regexp_XMLSchema.test(quad.object.id) && !regexp_Literal.test(quad.object.id)
    }
    else {
        return false
    }
}

function rdfs_or_owl_class(quad){
    if (quad.object.value) {
        return regexp_Class.test(quad.object.value)
    }
    else if (quad.object.id)  {
        return regexp_Class.test(quad.object.id)
    }
}


function paden(url){
    const domain = url.split('/')[2].split('.').reverse().join('/');
    let pad = ''
    let turtle = ''
    let notation_3 = ''
    if (regexp_ns.test(url)) {
        pad = url.split('/ns/')[1]
        turtle = [['main/resources', domain, 'ns', pad, path.basename(pad)].join('/'), 'ttl'].join('.')
        notation_3 = [['main/resources', domain, 'ns', pad, path.basename(pad)].join('/'), 'n3'].join('.')
    }
    else {
        const tail = ([x,y,z,...xs]) => xs;
        pad = tail(url.split('/')).join('/')
        turtle = [['main/resources', domain, pad, path.basename(pad)].join('/'), 'ttl'].join('.')
        notation_3 = [['main/resources', domain, pad, path.basename(pad)].join('/'), 'n3'].join('.')
    }
    return {"pad": pad, "turtle": turtle, "notation_3": notation_3}
}



function quad_to_rule(quad, objects, rule_array, regexp_uri) {

    if (regexp_uri.test(quad.subject.id) || regexp_uri.test(quad.subject.value)) { // subjects current ontology only
        if (quad.predicate.id === "http://www.w3.org/2000/01/rdf-schema#domain" || quad.predicate.value === "http://www.w3.org/2000/01/rdf-schema#domain") {
            rule_array.push(domain_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            } else if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
        }
        ;
        if ((quad.predicate.id === "http://www.w3.org/2000/01/rdf-schema#range" || quad.predicate.value === "http://www.w3.org/2000/01/rdf-schema#range") && range_should_be_defined(quad)) {
            rule_array.push(range_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            } else if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
            ;
        }
        ;
        if ((quad.predicate.id === "http://www.w3.org/2000/01/rdf-schema#subClassOf" || quad.predicate.value === "http://www.w3.org/2000/01/rdf-schema#subClassOf") && !rdfs_or_owl_class(quad) && quad.object.termType !== 'BlankNode') {
            rule_array.push(subclass_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            }
            if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
            ;
        }
        if (quad.predicate.id === "http://www.w3.org/2000/01/rdf-schema#subPropertyOf" || quad.predicate.value === "http://www.w3.org/2000/01/rdf-schema#subPropertyOf") {
            rule_array.push(subproperty_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            }
            if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
            ;
        }
        if (quad.predicate.id === "http://www.w3.org/2002/07/owl#inverseOf" || quad.predicate.value === "http://www.w3.org/2002/07/owl#inverseOf") {
            rule_array.push(inverseOf_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            }
            if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
            ;
        }
        if (quad.object.id === "http://www.w3.org/2002/07/owl#TransitiveProperty" || quad.object.value === "http://www.w3.org/2002/07/owl#TransitiveProperty") {
            rule_array.push(transitivity_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            }
            if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
            ;
        }
        if (quad.object.id === "http://www.w3.org/2002/07/owl#SymmetricProperty" || quad.object.value === "http://www.w3.org/2002/07/owl#SymmetricProperty") {
            rule_array.push(symmetry_rule(quad))
            if (quad.object.id && !regexp_uri.test(quad.object.id)) {
                objects.push(quad.object.id)
            }
            if (quad.object.value && !regexp_uri.test(quad.object.value)) {
                objects.push(quad.object.value)
            }
            ;
        }
        return {objects, rule_array}
    }
}


async function deref(_url, uri, domain, pad, turtle, notation_3, prefixen) {
    var objects = [];
    var rule_array = [];
    var regexp_uri = new RegExp(uri)
    console.log(_url);
    try {
        const ttl_writer = new N3.Writer({ format: 'text/turtle', prefixes: Object.assign({}, prefixen) });
        const { data , url } = await rdfDereferencer.dereference(_url);
        console.log(url);
        data.on('data', (quad) => {
            ttl_writer.addQuad(quad);
            quad_to_rule(quad, objects, rule_array, regexp_uri);
        })
        .on('error', (error) => console.error(error))
        .on('end', () => {
            if (!fs.existsSync(path.dirname(turtle))){
                fs.mkdirSync(path.dirname(turtle), { recursive: true });
            }
            if (!fs.existsSync(path.dirname(all_rules))){
                fs.mkdirSync(path.dirname(all_rules), { recursive: true });
            }
            fs.appendFileSync(notation_3, rule_array.join('\n') + '\n');
            fs.appendFileSync(all_rules, '\n' + rule_array.join('\n') + '\n');
            ttl_writer.end((error, result) => fs.writeFileSync(turtle, result));
            iterate(Array.from(new Set(objects)).sort(), prefixen)
        });
    }
    catch(error) {
        console.log('no such ' + _url);
        const text = [['main/error', domain, 'ns', pad, path.basename(pad)].join('/'), 'txt'].join('.')
        if (!fs.existsSync(path.dirname(text))){
            fs.mkdirSync(path.dirname(text), { recursive: true });
        }
        fs.writeFileSync(text, error.message)
    }
}



async function iterate(uris, prefixen) {
    for (let uri of uris) {
        await sleep(1000)
        var url = uri.split('#')[0];
        const domain = url.split('/')[2].split('.').reverse().join('/');
        let p = paden(url)
        const pad = p.pad
        const turtle = p.turtle
        const notation_3 = p.notation_3
        deref(url, uri, domain,  pad, turtle, notation_3, prefixen)
    }
}



export { quad_to_rule, iterate, symmetry_rule, transitivity_rule, inverseOf_rule, subproperty_rule, subclass_rule, range_rule, domain_rule, range_should_be_defined };


