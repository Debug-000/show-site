package svc_test

import (
	"context"

	"github.com/GoLabra/labrago/src/api/domain/svc"
	"github.com/GoLabra/labrago/src/api/entgql/entity"
	"github.com/GoLabra/labrago/src/api/mocks"
	. "github.com/GoLabra/labrago/src/api/utils"

	"github.com/golang/mock/gomock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	. "github.com/onsi/gomega/gstruct"
	"github.com/onsi/gomega/types"
)

var (
	idFieldMatcher = MatchAllFields(Fields{
		"Name":           Equal("id"),
		"EntName":        BeEmpty(),
		"Caption":        Equal("Id"),
		"Type":           Equal(string(entity.FieldTypeID)),
		"Required":       BeNil(),
		"Unique":         BeNil(),
		"DefaultValue":   BeNil(),
		"Min":            BeNil(),
		"Max":            BeNil(),
		"Private":        BeNil(),
		"Nillable":       Equal(false),
		"UpdateDefault":  Equal(false),
		"AcceptedValues": BeNil(),
	})
	createdAtMatcher = MatchAllFields(Fields{
		"Name":           Equal("createdAt"),
		"EntName":        Equal("created_at"),
		"Caption":        Equal("Created At"),
		"Type":           Equal(string(entity.FieldTypeDateTime)),
		"Required":       BeNil(),
		"Unique":         BeNil(),
		"DefaultValue":   PointTo(Equal("now()")),
		"Min":            BeNil(),
		"Max":            BeNil(),
		"Private":        BeNil(),
		"Nillable":       Equal(true),
		"UpdateDefault":  Equal(false),
		"AcceptedValues": BeNil(),
	})
	updatedAtMatcher = MatchAllFields(Fields{
		"Name":           Equal("updatedAt"),
		"EntName":        Equal("updated_at"),
		"Caption":        Equal("Updated At"),
		"Type":           Equal(string(entity.FieldTypeDateTime)),
		"Required":       BeNil(),
		"Unique":         BeNil(),
		"DefaultValue":   PointTo(Equal("now()")),
		"Min":            BeNil(),
		"Max":            BeNil(),
		"Private":        BeNil(),
		"Nillable":       Equal(true),
		"UpdateDefault":  Equal(true),
		"AcceptedValues": BeNil(),
	})
	createdByMatcher = MatchAllFields(Fields{
		"Name":             Equal("CreatedBy"),
		"EntName":          Equal("created_by"),
		"Caption":          Equal("Created By"),
		"Type":             Equal("User"),
		"BelongsToCaption": BeNil(),
		"Required":         BeNil(), // TODO will be required
		"RelationType":     Equal(entity.RelationTypeOne),
		"Private":          BeNil(),
		"Ref":              Equal(""),
	})
	updatedByMatcher = MatchAllFields(Fields{
		"Name":             Equal("UpdatedBy"),
		"EntName":          Equal("updated_by"),
		"Caption":          Equal("Updated By"),
		"Type":             Equal("User"),
		"BelongsToCaption": BeNil(),
		"Required":         BeNil(), // TODO will be required
		"RelationType":     Equal(entity.RelationTypeOne),
		"Private":          BeNil(),
		"Ref":              Equal(""),
	})
)

var _ = Describe("Create Entity", func() {
	var (
		e                 *svc.Entity
		ctx               context.Context
		mockController    *gomock.Controller
		mockSchemaManager *mocks.MockSchemaManager
	)
	BeforeEach(func() {
		ctx = context.Background()
		mockController = gomock.NewController(GinkgoT())
		mockSchemaManager = mocks.NewMockSchemaManager(mockController)
		e = svc.NewEntity(mockSchemaManager)
	})

	When("Create entity is called", func() {
		var (
			createInput entity.CreateEntityInput
		)
		Context("Entity without fields and edges", func() {
			BeforeEach(func() {
				createInput = entity.CreateEntityInput{
					Caption: "Test Entity",
					DisplayField: entity.FieldWhereUniqueInput{
						Name: P("id"),
					},
				}
			})
			It("Will create default fields", func() {
				mockSchemaManager.EXPECT().BackupSchema().Return(nil)
				mockSchemaManager.EXPECT().Generate(gomock.Any(), gomock.Any()).Return(nil)
				mockSchemaManager.EXPECT().WriteEntityToSchema(Matches(
					MatchFields(IgnoreExtras, Fields{
						"Entity": MatchAllFields(Fields{
							"Name":             Equal("testEntity"),
							"EntName":          Equal("TestEntity"),
							"Caption":          Equal("Test Entity"),
							"Owner":            Equal(entity.EntityOwnerUser),
							"DisplayFieldName": Equal("id"),
						}),
						"Fields": MatchAllElementsWithIndex(IndexIdentity, Elements{
							"0": idFieldMatcher,
							"1": createdAtMatcher,
							"2": updatedAtMatcher,
						}),
						"Edges":           Ignore(),
						"RelatedEntities": BeEmpty(),
					}),
				)).Return(nil)

				_, err := e.CreateEntity(ctx, createInput)
				Expect(err).To(BeNil())
			})

			It("Will create default edges", func() {
				mockSchemaManager.EXPECT().BackupSchema().Return(nil)
				mockSchemaManager.EXPECT().Generate(gomock.Any(), gomock.Any()).Return(nil)
				mockSchemaManager.EXPECT().WriteEntityToSchema(Matches(
					MatchFields(IgnoreExtras, Fields{
						"Entity": MatchAllFields(Fields{
							"Name":             Equal("testEntity"),
							"EntName":          Equal("TestEntity"),
							"Caption":          Equal("Test Entity"),
							"Owner":            Equal(entity.EntityOwnerUser),
							"DisplayFieldName": Equal("id"),
						}),
						"Fields": Ignore(),
						"Edges": MatchAllElementsWithIndex(IndexIdentity, Elements{
							"0": createdByMatcher,
							"1": updatedByMatcher,
						}),
						"RelatedEntities": BeEmpty(),
					}),
				)).Return(nil)

				_, err := e.CreateEntity(ctx, createInput)
				Expect(err).To(BeNil())
			})
		})
		Context("Entity with short text field", func() {
			var createFieldInput entity.CreateFieldInput
			BeforeEach(func() {
				createInput = entity.CreateEntityInput{
					Caption: "Test Entity",
					DisplayField: entity.FieldWhereUniqueInput{
						Name: P("id"),
					},
					Fields: &entity.CreateManyFieldsInput{
						Create: []*entity.CreateFieldInput{},
					},
				}

				createFieldInput = entity.CreateFieldInput{
					Caption: "Short Text",
					Type:    string(entity.FieldTypeShortText),
				}
			})

			It("Will create basic short text field", func() {
				mockSchemaManager.EXPECT().BackupSchema().Return(nil)
				mockSchemaManager.EXPECT().Generate(gomock.Any(), gomock.Any()).Return(nil)
				mockSchemaManager.EXPECT().WriteEntityToSchema(Matches(
					MatchFields(IgnoreExtras, Fields{
						"Entity": MatchAllFields(Fields{
							"Name":             Equal("testEntity"),
							"EntName":          Equal("TestEntity"),
							"Caption":          Equal("Test Entity"),
							"Owner":            Equal(entity.EntityOwnerUser),
							"DisplayFieldName": Equal("id"),
						}),
						"Fields": MatchAllElementsWithIndex(IndexIdentity, Elements{
							"0": idFieldMatcher,
							"1": createdAtMatcher,
							"2": updatedAtMatcher,
							"3": MatchAllFields(Fields{
								"Name":           Equal("shortText"),
								"EntName":        Equal("short_text"),
								"Caption":        Equal("Short Text"),
								"Type":           Equal(string(entity.FieldTypeShortText)),
								"Required":       BeNil(),
								"Unique":         BeNil(),
								"DefaultValue":   BeNil(),
								"Min":            BeNil(),
								"Max":            BeNil(),
								"Private":        BeNil(),
								"Nillable":       Equal(false),
								"UpdateDefault":  Equal(false),
								"AcceptedValues": BeNil(),
							}),
						}),
						"Edges": MatchAllElementsWithIndex(IndexIdentity, Elements{
							"0": createdByMatcher,
							"1": updatedByMatcher,
						}),
						"RelatedEntities": BeEmpty(),
					}),
				)).Return(nil)

				createInput.Fields.Create = append(createInput.Fields.Create, &createFieldInput)
				_, err := e.CreateEntity(ctx, createInput)
				Expect(err).To(BeNil())
			})

			It("Will create required short text field", func() {
				mockSchemaManager.EXPECT().BackupSchema().Return(nil)
				mockSchemaManager.EXPECT().Generate(gomock.Any(), gomock.Any()).Return(nil)
				mockSchemaManager.EXPECT().WriteEntityToSchema(Matches(
					MatchFields(IgnoreExtras, Fields{
						"Entity": MatchAllFields(Fields{
							"Name":             Equal("testEntity"),
							"EntName":          Equal("TestEntity"),
							"Caption":          Equal("Test Entity"),
							"Owner":            Equal(entity.EntityOwnerUser),
							"DisplayFieldName": Equal("id"),
						}),
						"Fields": MatchAllElementsWithIndex(IndexIdentity, Elements{
							"0": idFieldMatcher,
							"1": createdAtMatcher,
							"2": updatedAtMatcher,
							"3": MatchAllFields(Fields{
								"Name":           Equal("shortText"),
								"EntName":        Equal("short_text"),
								"Caption":        Equal("Short Text"),
								"Type":           Equal(string(entity.FieldTypeShortText)),
								"Required":       PointTo(Equal(true)),
								"Unique":         BeNil(),
								"DefaultValue":   BeNil(),
								"Min":            BeNil(),
								"Max":            BeNil(),
								"Private":        BeNil(),
								"Nillable":       Equal(false),
								"UpdateDefault":  Equal(false),
								"AcceptedValues": BeNil(),
							}),
						}),
						"Edges": MatchAllElementsWithIndex(IndexIdentity, Elements{
							"0": createdByMatcher,
							"1": updatedByMatcher,
						}),
						"RelatedEntities": BeEmpty(),
					}),
				)).Return(nil)

				createFieldInput.Required = P(true)

				createInput.Fields.Create = append(createInput.Fields.Create, &createFieldInput)
				_, err := e.CreateEntity(ctx, createInput)
				Expect(err).To(BeNil())
			})
		})
	})
})

type gomegaAdapter struct {
	matcher        types.GomegaMatcher
	failureMessage string
}

func Matches(matcher types.GomegaMatcher) gomock.Matcher {
	return &gomegaAdapter{
		matcher: matcher,
	}
}

func (m *gomegaAdapter) Matches(arg interface{}) bool {
	success, err := m.matcher.Match(arg)
	if err != nil {
		m.failureMessage = err.Error()
		return false
	}

	if !success {
		m.failureMessage = m.matcher.FailureMessage(arg)
	}

	return success
}

func (m *gomegaAdapter) String() string {
	return m.failureMessage
}
