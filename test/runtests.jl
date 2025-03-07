#
# Unit tests for DocumenterQuarto.jl
#

using Test
using DocumenterQuarto
using Markdown

module Types
    export _type

    """
    An empty type.
    """
    struct _type end
end

using .Types

module Values
    export _type_instance, _string_instance

    """
    An empty type.
    """
    struct _type end

    """
    A constant struct instance.
    """
    const _type_instance = _type()

    """
    A constant primitive.
    """
    const _string_instance = "string"
end

using .Values

@testset "Types" begin
    @test DocumenterQuarto.doc(Types, :_type) isa Markdown.MD
    @test DocumenterQuarto.autodoc(Types) isa Markdown.MD
    @test DocumenterQuarto.@doc(_type) isa Markdown.MD
end


@testset "Values" begin
    @test DocumenterQuarto.doc(Values, :_type_instance) isa Markdown.MD
    @test DocumenterQuarto.autodoc(Values) isa Markdown.MD
    @test DocumenterQuarto.@doc(_string_instance) isa Markdown.MD
end

"""
Returns "Int".
"""
f(::Int) = "Int"

"""
Returns "String".
"""
f(::String) = "String"

@testset "Macros" begin
    @test DocumenterQuarto.@doc(_type_instance) == Base.Docs.@doc(_type_instance)
    @test string(DocumenterQuarto.@doc(f)) == "Returns \"Int\".\n\nReturns \"String\".\n"
    @test string(DocumenterQuarto.@doc(f(::Int))) == "Returns \"Int\".\n"
    @test string(DocumenterQuarto.@doc(f(::String))) == "Returns \"String\".\n"

end